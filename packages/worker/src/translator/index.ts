/* eslint-disable no-console */
import _, { flatMap, isObject, values } from 'lodash'
import { parse } from 'lua-json'
import pMap from 'p-map'

enum Category {
  Ship = 'Ship',
  Equipment = 'Equipment',
  Item = 'Item',
  Enemy = 'Enemy',
  EnemyEquipment = 'EnemyEquipment',
}

const mapping: Record<Category, string> = {
  [Category.Ship]: 'ship',
  [Category.Equipment]: 'slotitem',
  [Category.Item]: 'useitem',
  [Category.Enemy]: 'ship-abyssal',
  [Category.EnemyEquipment]: 'slotitem-abyssal',
}

const fetchWithCache = (url: string) =>
  fetch(url, {
    cf: {
      cacheEverything: true,
      cacheTtl: 60 * 60 * 24, // 24 hours
    },
  })

/**
 * Downloads data on one page and converts to JSON
 * @param title data/page name
 */
const getLuaData = async (title: string): Promise<Record<string, string>> =>
  parse(
    await (
      await fetchWithCache(`https://en.kancollewiki.net/${title}?action=raw`)
    ).text(),
  ) as Record<string, string>

interface MediaWikiAPIParams {
  action: string
  format: string
  generator: string
  gaplimit: number
  gapnamespace: number
  gapfilterredir: string
  gapprefix: string
  prop: string
  rvprop: string
  gapcontinue?: number
}

interface MediaWikiAPIData {
  query: {
    pages: {
      title: string
      revisions: {
        ['*']: string
      }[]
    }[]
  }
  continue: {
    gapcontinue: number
  }
}

interface Page {
  _name: string
  _japanese_name: string
  _suffix: string | false
  _display_suffix?: string
  _api_id: number
  _id: number
}

/**
 * Downloads multiple-page lua data and converts to JSON
 * the return data could be 2 format: entry[]
 * or Record<string, entry>, e.g. for a ship it will be { "": ..., "kai": ..., "kai2": ...}
 * @param category data category name
 */
const getLuaDataInCategory = async (
  category: Category,
): Promise<(Page | Record<string, Page>)[]> => {
  let pages: (Page | Record<string, Page>)[] = []
  const loop = async (cont?: number): Promise<void> => {
    const params: MediaWikiAPIParams = {
      action: 'query',
      format: 'json',
      generator: 'allpages',
      gaplimit: 50,
      gapnamespace: 828, // Module
      gapfilterredir: 'nonredirects',
      gapprefix: `Data/${category}/`,
      prop: 'revisions',
      rvprop: 'content',
    }
    if (cont) {
      params.gapcontinue = cont
    }
    const url = new URL('w/api.php', 'https://en.kancollewiki.net')
    _.each(params, (v, k) => url.searchParams.append(k, String(v)))
    const data: MediaWikiAPIData = await (
      await fetchWithCache(url.toString())
    ).json()

    const morePages = values(data.query.pages)
      .filter(
        (page) =>
          !page.title.includes('Vita:') && !page.title.includes('Mist:'),
      )
      .map(
        (page) => parse(page.revisions[0]['*']) as Page | Record<string, Page>,
      )
    pages = pages.concat(morePages)
    if (data.continue) {
      await loop(data.continue.gapcontinue)
    }
  }
  await loop()
  return pages
}

/**
 * Removes `flagship` and `elite` from enemy ship names because they're not translated
 * @param name ship name
 */
const fixApiYomi = (name: string) =>
  name.replace(/\s?flagship/i, '').replace(/\s?elite/i, '')

/**
 * removes roman number suffix for enemy ship names because they're not translated
 * @param suffix ship name
 */
const fixEnemySuffix = (suffix: string) =>
  fixApiYomi(suffix)
    .replace(/\s[IVX][IVX]*$/, '')
    .replace('- Damaged', 'Damaged')
    .trim()

interface ContextItem {
  id: number
  name: string
  baseName: string
  fullEnemyName: string | false
  type: Category
  fix?: boolean
}

type ResultContext = { global: Record<string, string> } & Record<
  string,
  Record<string, ContextItem>
>

/**
 * Gets the item name from data
 * @param context the existing results for avoiding conflicts, context.global is a simple record of collected translations,
 *                and context[Category] contains more information
 * @param type entity type
 */
const extractName =
  (context: ResultContext, type: Category) =>
  (data: Page | Record<string, Page>): [string, string][] => {
    // handle modules with multiple data parts
    // eslint-disable-next-line no-underscore-dangle
    if (!data._name) {
      if (isObject(data)) {
        return flatMap(data as Record<string, Page>, extractName(context, type))
      }
      return []
    }
    // extract data from the module
    const {
      _name,
      _japanese_name: _jpName,
      _suffix,
      // eslint-disable-next-line camelcase
      _display_suffix,
      _api_id: _apiId,
      _id,
    } = data as Page
    const isEnemy = type === Category.Enemy
    const id =
      isEnemy && _apiId && _apiId < 1501 ? _apiId + 1000 : _apiId || _id
    const suffix = isEnemy
      ? _suffix && fixEnemySuffix(_suffix)
      : // eslint-disable-next-line camelcase
        _display_suffix || _suffix
    const name = suffix ? `${_name} ${suffix}` : _name
    const fullEnemyName =
      isEnemy &&
      (_suffix ? `${_name} ${_suffix.replace('- Damaged', 'Damaged')}` : _name)
    const jpName = isEnemy ? _jpName && fixApiYomi(_jpName) : _jpName
    // not sufficient data
    if (!jpName || (isEnemy && !id)) {
      return []
    }
    // incomplete module
    if (!id) {
      return [[jpName, name]]
    }
    // handle conflicts for this type
    const typeContext: Record<string, ContextItem> = context[type]
    if (
      typeContext[jpName] &&
      (typeContext[jpName].name !== name ||
        typeContext[jpName].fullEnemyName !== fullEnemyName)
    ) {
      // will need to fix first translation later, guaranteed to be the right one by
      // getLuaDataInCategory order and wikia naming conventions
      typeContext[jpName].fix = true
      return [[`${jpName}_${id}`, fullEnemyName || name]]
    }
    typeContext[jpName] = {
      id,
      name,
      baseName: _name,
      fullEnemyName,
      type,
    }
    // warn about global conflicts
    const globalContext = context.global
    if (globalContext[jpName] && globalContext[jpName] !== name) {
      console.log(`global name conflict for ${jpName}`)
    }
    globalContext[jpName] = name
    // no conflicts
    return [[jpName, name]]
  }

/**
 * Downloads data from wikia
 */
export const getUpdateFromMediaWiki = async (): Promise<
  Record<string, any>
> => {
  const db = await pMap(Object.keys(Category), async (name) => [
    name,
    await getLuaDataInCategory(name as unknown as Category),
  ])

  // context for translation conflicts
  const context: ResultContext = { global: {} }

  const result = _(db)
    .map(
      ([type, articles]: [
        type: Category,
        articals: (Page | Record<string, Page>)[],
      ]) => {
        context[type] = context[type] || {}
        const typeResult: Record<string, string> = _(articles)
          .flatMap(extractName(context, type))
          .fromPairs()
          .value()
        // update first matches for all conflicts
        _(context[type]).forEach(
          ({ id, name, baseName, fullEnemyName, fix }, jpName) => {
            if (fix || (name && fullEnemyName && name !== fullEnemyName)) {
              // support no context, currently only adding (?) for enemy equipment, also Souya needs a kludge
              typeResult[jpName] =
                (jpName === '宗谷' ? baseName : name) +
                (type === Category.EnemyEquipment ? ' (?)' : '')
              typeResult[`${jpName}_${id}`] = fullEnemyName || name
            }
          },
        )
        return [mapping[type], typeResult]
      },
    )
    .fromPairs()
    .value()

  result['slotitem-type'] = await getLuaData('Module:Data/EquipmentTypeNames')
  result['ship-type'] = await getLuaData('Module:Data/ShipTypeNames')

  return _.merge({}, ...Object.values(result))
}

import trimStart from 'lodash/trimStart'
import { UAParser } from 'ua-parser-js'
import size from 'lodash/size'

import { languageFallback } from '../i18n'

import { targets, Contents } from '../model'

const BASE_URI = 'https://npm.taobao.org/mirrors/poi'
const DEFAULT_URI = 'https://github.com/poooi/poi/releases'

// the semver-regex package does not support `-beta.0` prerelase version, have to host one here
// copied from https://regex101.com/r/vkijKf/1/ which is suggested by semver.org
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

export const getDownloadLink = (
  version: string | undefined,
  target: targets,
) => {
  const pure = trimStart(version, 'v')
  if (!semverRegex.test(pure)) {
    return DEFAULT_URI
  }
  switch (target) {
    case targets.linux:
      return `${BASE_URI}/${version}/poi-${pure}.7z`
    case targets.linuxDeb:
      return `${BASE_URI}/${version}/poi_${pure}_amd64.deb`
    case targets.linuxRpm:
      return `${BASE_URI}/${version}/poi-${pure}.x86_64.rpm`
    case targets.macos:
      return `${BASE_URI}/${version}/poi-${pure}.dmg`
    case targets.win32:
      return `${BASE_URI}/${version}/poi-${pure}-ia32-win.7z`
    case targets.win32Setup:
      return `${BASE_URI}/${version}/poi-setup-${pure}.exe`
    case targets.win64:
      return `${BASE_URI}/${version}/poi-${pure}-win.7z`
    case targets.win64Setup:
      return `${BASE_URI}/${version}/poi-setup-${pure}.exe`
    default:
      return DEFAULT_URI
  }
}

export const detectTarget = () => {
  const { os, cpu } = new UAParser().getResult()
  if (os.name === 'Linux') {
    return targets.linux
  }
  if (os.name === 'Debian' || os.name === 'Ubuntu') {
    return targets.linuxDeb
  }
  if (os.name === 'CentOS' || os.name === 'Fedora') {
    return targets.linuxRpm
  }
  if (os.name === 'Mac OS') {
    return targets.macos
  }
  if (os.name === 'Windows') {
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      return targets.win64Setup
    }
    return targets.win32Setup
  }
  return targets.linux
}

export const getLanguageFallbackContent = (
  contents: Contents,
  lang: string,
): string => {
  if (contents[lang]) {
    return contents[lang]
  }

  if (languageFallback[lang as keyof typeof languageFallback]) {
    for (
      let i = 0;
      i < size(languageFallback[lang as keyof typeof languageFallback]);
      i += 1
    ) {
      const res = getLanguageFallbackContent(
        contents,
        languageFallback[lang as keyof typeof languageFallback][i],
      )
      if (res) {
        return res
      }
    }
  }

  return ''
}

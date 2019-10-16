import { targets } from '../model'

const BASE_URI = 'https://npm.taobao.org/mirrors/poi'

export const getDownloadLink = (version: string, target: targets) => {
  const pure = version.substring(1)
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
      return 'https://github.com/poooi/poi/releases'
  }
}

import { UAParser } from 'ua-parser-js'

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

const detectTarget = () => {
  const { os, cpu } = new UAParser().getResult()
  if (os.name === 'Linux') {
    return targets.linux
  } else if (os.name === 'Debian' || os.name === 'Ubuntu') {
    return targets.linuxDeb
  } else if (os.name === 'CentOS' || os.name === 'Fedora') {
    return targets.linuxRpm
  } else if (os.name === 'Mac OS') {
    return targets.macos
  } else if (os.name === 'Windows') {
    if (cpu.architecture === 'ia64' || cpu.architecture === 'amd64') {
      return targets.win64Setup
    }
    return targets.win32Setup
  }
  return targets.linux
}

export const autoDetectedTarget = detectTarget()

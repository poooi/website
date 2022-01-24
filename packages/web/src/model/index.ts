export interface Version {
  version: string
  betaVersion: string
}

export enum targets {
  linux = 'linux-x64',
  linuxArm = 'linux-arm',
  linuxDeb = 'linux-deb-x64',
  linuxDebArm = 'linux-deb-arm',
  linuxRpm = 'linux-rpm-x64',
  macos = 'macos-x64',
  macosArm = 'macos-arm',
  win64Setup = 'win-x64-setup',
  win64 = 'win-x64',
  win32Setup = 'win-ia32-setup',
  win32 = 'win-ia32',
  winArm = 'win-arm',
}

export interface Contents {
  [key: string]: string
}

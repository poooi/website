export interface IVersion {
  version: string
  betaVersion: string
}

export enum targets {
  linux = 'linux-x64',
  linuxDeb = 'linux-deb-x64',
  linuxRpm = 'linux-rpm-x64',
  macos = 'macos-x64',
  win64Setup = 'win-x64-setup',
  win64 = 'win-x64',
  win32Setup = 'win-ia32-setup',
  win32 = 'win-ia32',
}

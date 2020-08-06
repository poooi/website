import React from 'react'
import { Download } from '../download'

export default {
  title: 'Download',
  component: Download,
}

export const StableVersionOnly = () => (
  <Download version={{ version: 'v10.2.4', betaVersion: 'v10.0.0-beta.1' }} />
)

export const BetaVersionAvailable = () => (
  <Download version={{ version: 'v10.2.4', betaVersion: 'v11.0.0-beta.0' }} />
)

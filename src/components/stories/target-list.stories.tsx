import { TargetList } from '../target-list'

export default {
  title: 'Target List',
  component: TargetList,
}

export const StableVersionOnly = () => (
  <TargetList version={{ version: 'v10.2.4', betaVersion: 'v10.0.0-beta.1' }} />
)

export const BetaVersionAvailable = () => (
  <TargetList version={{ version: 'v10.2.4', betaVersion: 'v11.0.0-beta.0' }} />
)

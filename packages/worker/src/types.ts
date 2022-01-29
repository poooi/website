import Toucan from 'toucan-js'

export interface WorkerEnv {
  __STATIC_CONTENT?: string
  SENTRY_DSN?: string
}

export interface RouteContext {
  env: WorkerEnv
  context: ExecutionContext
  sentry: Toucan | null
}

export interface PoiVersions {
  version: string
  betaVersion: string
}

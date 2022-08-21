import Toucan from 'toucan-js'

export interface WorkerEnv {
  __STATIC_CONTENT?: KVNamespace
  SENTRY_DSN?: string
  TRANSLATOR: KVNamespace
}

export interface RouteContext {
  env: WorkerEnv
  context: ExecutionContext
  sentry: Toucan | null
}

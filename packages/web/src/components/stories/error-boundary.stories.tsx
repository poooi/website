import { ErrorBoundary } from '../error-boundary'

export default {
  title: 'Error Boundary',
  component: ErrorBoundary,
}

const RenderError = () => <div>{({} as any).foo()}</div>

export const Throws = () => (
  <ErrorBoundary>
    <RenderError />
  </ErrorBoundary>
)

import React from 'react'
import { ErrorBoundary } from '../error-boundary'

export default {
  title: 'Error Boundary',
  component: ErrorBoundary,
}

const RenderError = () => {
  return <div>{({} as any).foo()}</div>
}

export const Throws = () => (
  <ErrorBoundary>
    <RenderError />
  </ErrorBoundary>
)

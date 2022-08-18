import { Component, ReactNode } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

interface State {
  hasError: boolean
}

interface Props extends WithTranslation {
  children: ReactNode
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`

const Text = styled.div`
  margin-bottom: 1em;
`

const handleReload = () => window.location.reload()

export const ErrorBoundary = withTranslation()(
  class ErrorBoundaryBase extends Component<Props, State> {
    public state = {
      hasError: false,
    }

    public componentDidCatch() {
      this.setState({
        hasError: true,
      })
    }

    public render() {
      const { children, t } = this.props
      const { hasError } = this.state
      if (hasError) {
        return (
          <Container>
            <Text>{t('error-message')}</Text>
            <div>
              <button type="button" onClick={handleReload}>
                {t('Reload')}
              </button>
            </div>
          </Container>
        )
      }

      return children
    }
  },
)

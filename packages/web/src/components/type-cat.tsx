import { Component } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  margin: 20px 10px;
`

const Mirror = styled.div<{ show: boolean; hide?: boolean }>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  display: ${(props) => props.hide && 'none'};

  .Cursor--blinking {
    opacity: 1;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

interface Props {
  text: string
}

interface State {
  stage: string
}

export class TypeCat extends Component<Props, State> {
  public state = {
    stage: 'loaded',
  }

  public componentDidMount() {
    this.setState({
      stage: 'typing',
    })
  }

  public handleTypingDone = () => {
    setTimeout(() => {
      this.setState({
        stage: 'done',
      })
    }, 1000)
  }

  public render() {
    const { stage } = this.state
    const { text } = this.props
    return (
      <Container>
        <Mirror hide={stage !== 'typing'} show>
          <Typist
            cursor={{
              element: '_',
              hideWhenDone: true,
            }}
            onTypingDone={this.handleTypingDone}
          >
            {text}
          </Typist>
        </Mirror>
        <Mirror
          show={stage === 'done'}
          hide={stage === 'typing'}
          data-testid={stage}
        >
          {text}
          <span style={{ opacity: 0 }}>_</span>
        </Mirror>
      </Container>
    )
  }
}

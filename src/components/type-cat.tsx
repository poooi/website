import React from 'react'
import Typist from 'react-typist'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: inline-block;
  margin: 20px 10px;
`

const Mirror = styled.div<{ show: boolean; hide?: boolean }>`
  opacity: ${props => (props.show ? 1 : 0)};
  display: ${props => props.hide && 'none'};

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

interface IProps {
  text: string
}

interface IState {
  stage: string
  width: number
}

export class TypeCat extends React.Component<IProps, IState> {
  public state = {
    stage: 'loaded',
    width: 0,
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
    return (
      <Container>
        <Mirror hide={this.state.stage !== 'typing'} show={true}>
          <Typist
            cursor={{
              element: '_',
              hideWhenDone: true,
            }}
            onTypingDone={this.handleTypingDone}
          >
            {this.props.text}
          </Typist>
        </Mirror>
        <Mirror
          show={this.state.stage === 'done'}
          hide={this.state.stage === 'typing'}
          data-testid={this.state.stage}
        >
          {this.props.text}
          <span style={{ opacity: 0 }}>_</span>
        </Mirror>
      </Container>
    )
  }
}

import classNames from 'classnames'
import React from 'react'
import Typist from 'react-typist'

import styles from './type-cat.module.css'

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

  private mirror = React.createRef<HTMLDivElement>()

  public componentDidMount() {
    this.setState({
      stage: 'typing',
      width: this.mirror.current!.getBoundingClientRect().width,
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
      <div className={styles.container}>
        <div
          className={classNames({
            [styles.hide]: this.state.stage !== 'typing',
          })}
          style={{ width: this.state.width }}
        >
          <Typist
            cursor={{
              element: '_',
              hideWhenDone: true,
            }}
            onTypingDone={this.handleTypingDone}
          >
            {this.props.text}
          </Typist>
        </div>
        <div
          ref={this.mirror}
          className={classNames({
            [styles.mirror]: true,
            [styles.hide]: this.state.stage === 'typing',
            [styles.show]: this.state.stage === 'done',
          })}
          data-testid={this.state.stage}
        >
          {this.props.text}
        </div>
      </div>
    )
  }
}

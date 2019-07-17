import debounce from 'lodash/debounce'
import times from 'lodash/times'
import { Fabric, initializeIcons, loadTheme } from 'office-ui-fabric-react'
import { rgba } from 'polished'
import random from 'random'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { ThemeProvider } from 'styled-components'

import { darkTheme, getLocaleFontFamily, lightTheme } from './theme'

import { Content } from './components/content'
import { Footer } from './components/footer'
import { Header } from './components/header'

import './i18n'

initializeIcons()

const Container = styled(Fabric)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Canvas = styled.canvas`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.palette.white};
  transition: 0.3s;
`

const Wrapper = styled.div`
  color: ${props => props.theme.palette.neutralPrimary};
  flex: 1;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
`

/**
 * Draws an hexagone
 * @param ctx canvas context
 * @param x x coordinate
 * @param y y coordinate
 * @param r radius or edge length
 * @param fillStyle fill style
 * @param strokeStyle stroke style
 */
const drawHexagone = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fillStyle: CanvasFillStrokeStyles['fillStyle'],
  strokeStyle: CanvasFillStrokeStyles['strokeStyle'],
) => {
  ctx.beginPath()

  ctx.moveTo(x, y - r)

  const unit = Math.PI / 3
  // anti-clockwise
  times(6, (n: number) => {
    const angle = Math.PI / 2 + unit * (n + 1)
    ctx.lineTo(x + r * Math.cos(angle), y - r * Math.sin(angle))
  })
  ctx.closePath()
  ctx.fillStyle = fillStyle
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = 1
  ctx.fill()
  ctx.stroke()
}

const normal = random.normal(0.75, 0.25)

/**
 * get a random x,y coordinate with provide width and height
 * @param w width
 * @param h height
 */
const getRandomXY = (w: number, h: number) => {
  const x = Math.floor(w * Math.random())
  const y = Math.floor(h * normal())

  return { x, y }
}

const choiceDark = localStorage.getItem('theme') === 'dark'

export const App = () => {
  const { i18n } = useTranslation()

  const fontFamily = getLocaleFontFamily(i18n.language)

  useEffect(() => {
    loadTheme({
      defaultFontStyle: {
        fontFamily,
      },
    })
  }, [i18n.language])

  const [isDark, setIsDark] = useState(choiceDark)

  const canvas = useRef<HTMLCanvasElement>(null)

  const drawCanvas = useCallback(() => {
    if (!canvas.current) {
      return
    }
    const cvs = canvas.current
    const ctx = cvs.getContext('2d')!
    const pr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight

    cvs.width = w * pr
    cvs.height = h * pr
    cvs.style.width = `${w}px`
    cvs.style.height = `${h}px`
    ctx.scale(pr, pr)
    ctx.clearRect(0, 0, w, h)

    times(30, () => {
      const { x, y } = getRandomXY(w, h)

      drawHexagone(
        ctx,
        x,
        y,
        50,
        `${rgba((isDark ? darkTheme : lightTheme).palette.black, 0.1)}`,
        'transparent',
      )
    })
    times(30, () => {
      const { x, y } = getRandomXY(w, h)

      drawHexagone(
        ctx,
        x,
        y,
        50,
        'transparent',
        `${rgba((isDark ? darkTheme : lightTheme).palette.black, 0.1)}`,
      )
    })
  }, [canvas, isDark])

  useEffect(() => {
    drawCanvas()
    window.addEventListener('resize', debounce(drawCanvas, 100))
  }, [])

  useEffect(() => {
    loadTheme(isDark ? darkTheme : lightTheme)
    drawCanvas()
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Container>
        <Canvas ref={canvas} />
        <Wrapper>
          <Header onChangeTheme={() => setIsDark(!isDark)} isDark={isDark} />
          <Content />
          <Footer />
        </Wrapper>
      </Container>
    </ThemeProvider>
  )
}

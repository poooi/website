import debounce from 'lodash/debounce'
import times from 'lodash/times'
import { rgba } from 'polished'
import random from 'random'
import React, { useContext, useEffect, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'

const Canvas = styled.canvas`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.palette.white};
  transition: 0.3s;
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

export const Background = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  const theme = useContext(ThemeContext)

  const drawCanvasRef = useRef<() => void>()

  useEffect(() => {
    const drawCanvas = () => {
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
          `${rgba(theme.palette.black, 0.1)}`,
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
          `${rgba(theme.palette.black, 0.1)}`,
        )
      })
    }

    if (drawCanvasRef.current) {
      window.removeEventListener('resize', drawCanvasRef.current)
    }
    drawCanvasRef.current = debounce(drawCanvas, 100)

    drawCanvas()
    window.addEventListener('resize', drawCanvasRef.current)
  }, [canvas, theme])

  return <Canvas ref={canvas} />
}

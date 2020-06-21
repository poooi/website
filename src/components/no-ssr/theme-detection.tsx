import { useContext, useEffect } from 'react'
import { DispatchThemeChangeContext } from '../../theme'

const getDefaultIsDark = (): boolean => {
  if (window.localStorage?.getItem('theme')) {
    return localStorage.getItem('theme') === 'dark'
  }
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export const ThemeDetection = () => {
  const dispatch = useContext(DispatchThemeChangeContext)

  useEffect(() => dispatch(getDefaultIsDark()), [])

  return null
}

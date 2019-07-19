import { initializeIcons } from 'office-ui-fabric-react'
import React, { useEffect } from 'react'

const IconLoader = () => {
  useEffect(() => {
    initializeIcons()
  }, [])
  return <></>
}

export default IconLoader

// tslint:disable

// import original module declarations
import { Colors } from '@blueprintjs/core'
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    colors: Colors
    name: string
    variant: string
    text: string
    background: string
  }
}

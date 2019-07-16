// tslint:disable

// import original module declarations
import { IPalette } from 'office-ui-fabric-react'
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    palette: IPalette
  }
}

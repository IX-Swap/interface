declare module '*.ttf'
declare module '*.otf'
declare module '*.pdf'

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  import { FunctionComponent } from 'react'

  const content: string
  const ReactComponent: FunctionComponent

  export const ReactComponent
  export default content
}

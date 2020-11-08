import React, { PropsWithChildren } from 'react'
import Themes from 'v2/themes'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

export const DarkTheme = (props: PropsWithChildren<{}>) => {
  const { children } = props
  return <ThemeProvider theme={Themes.dark}>{children}</ThemeProvider>
}

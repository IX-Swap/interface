import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { SnackbarContainer } from 'uno-material-ui'
import Themes from './v2/themes'
import { UserProvider } from 'v2/auth/context'
import { EntryPoint } from 'v2/EntryPoint'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={Themes.default}>
      <SnackbarContainer />
      <CssBaseline />
      <UserProvider>
        <EntryPoint />
      </UserProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
)

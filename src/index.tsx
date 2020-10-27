// import 'wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import Themes from './v2/themes'
import { UserProvider } from 'v2/auth/context'
import { EntryPoint } from 'v2/EntryPoint'
import { setupSentry } from 'setupSentry'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

setupSentry()

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={Themes.default}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <CssBaseline />
        <UserProvider>
          <EntryPoint />
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
)

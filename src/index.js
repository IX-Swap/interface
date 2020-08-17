import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { SnackbarContainer } from 'uno-material-ui'

import Themes from './themes'
import * as serviceWorker from './serviceWorker'
import { UserProvider } from 'v2/Auth/context'
import EntryPoint from './v2'

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

// import 'wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import Themes from 'v2/themes'
import { UserProvider } from 'v2/auth/context'
import { EntryPoint } from 'v2/EntryPoint'
import { ToastProvider } from 'react-toast-notifications'
import { Toast } from 'v2/components/Toast'
import { Router, Switch } from 'react-router-dom'
import { history } from 'v2/history'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { setupSentry } from 'setupSentry'
import { setupFullStory } from 'setupFullStory'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

setupSentry()
setupFullStory()

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={Themes.default}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <CssBaseline />
        <UserProvider>
          <Router history={history}>
            <Switch>
              <ToastProvider
                components={{ Toast }}
                autoDismiss={false}
                placement='bottom-right'
              >
                <EntryPoint />
              </ToastProvider>
            </Switch>
          </Router>
        </UserProvider>
      </ReactQueryCacheProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
)

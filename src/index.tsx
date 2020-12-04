// import 'wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import themes from 'themes'
import { UserProvider } from 'auth/context'
import { EntryPoint } from 'EntryPoint'
import { ToastProvider } from 'react-toast-notifications'
import { Toast } from 'components/Toast'
import { Router, Switch } from 'react-router-dom'
import { history } from 'config/history'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { setupSentry } from 'setupSentry'
import { setupFullStory } from 'setupFullStory'
import { initGoogleAnalytics } from 'initGoogleAnalytics'

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
initGoogleAnalytics()

console.log(`App version: ${APP_VERSION}`) // eslint-disable-line

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={themes.default}>
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

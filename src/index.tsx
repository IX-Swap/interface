import React from 'react'
import ReactDOM from 'react-dom'
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { UserProvider } from 'auth/context'
import { EntryPoint } from 'EntryPoint'
import { ToastProvider } from 'react-toast-notifications'
import { Toast } from 'components/Toast'
import { ToastContainer } from 'components/ToastContainer/ToastContainer'
import { Router, Switch } from 'react-router-dom'
import { history } from 'config/history'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { setupSentry } from 'setupSentry'
import { setupFullStory } from 'setupFullStory'
import { AppThemeProvider } from 'AppThemeProvider'
import { AppStateProvider } from 'app/hooks/useAppState'
import { setupGtagManager } from 'setupGtagManager'

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
setupGtagManager()

const IXApp = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <AppThemeProvider>
        {theme => (
          <ThemeProvider theme={theme}>
            <ReactQueryCacheProvider queryCache={queryCache}>
              <CssBaseline />
              <UserProvider>
                <Router history={history}>
                  <AppStateProvider>
                    <Switch>
                      <ToastProvider
                        components={{ Toast, ToastContainer }}
                        autoDismiss={false}
                        placement='bottom-right'
                      >
                        <EntryPoint />
                      </ToastProvider>
                    </Switch>
                  </AppStateProvider>
                </Router>
              </UserProvider>
            </ReactQueryCacheProvider>
          </ThemeProvider>
        )}
      </AppThemeProvider>
    </StylesProvider>
  )
}

ReactDOM.render(<IXApp />, document.getElementById('root'))

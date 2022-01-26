import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import createGenerateClassName from '@mui/styles/createGenerateClassName';
import StylesProvider from '@mui/styles/StylesProvider';
import { CssBaseline } from '@mui/material'
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
import { setupGoogleAnalytics } from 'setupGoogleAnalytics'
import { AppStateProvider } from 'app/hooks/useAppState'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
setupGoogleAnalytics()

const IXApp = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <AppThemeProvider>
        {theme => (
          <StyledEngineProvider injectFirst>
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
          </StyledEngineProvider>
        )}
      </AppThemeProvider>
    </StylesProvider>
  );
}

ReactDOM.render(<IXApp />, document.getElementById('root'))

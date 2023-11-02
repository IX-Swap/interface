import { CookiesProvider } from 'react-cookie'
import { StrictMode } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { LocalizationProvider } from '@material-ui/pickers'
import DayJsUtils from '@material-ui/pickers/adapter/dayjs'
import 'react-phone-input-2/lib/bootstrap.css'
import { Web3ReactProvider } from '@web3-react/core'
import { connectors } from 'connectors'

import { MuiThemeProvider } from './theme/muiTheme'
import { CustomHeaders } from './components/CustomHeaders'
import Blocklist from './components/Blocklist'
import { LanguageProvider } from './i18n'
import './index.css'
import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import SecTokenListUpdater from './state/secTokens/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import ThemeProvider, { ThemedGlobalStyle } from './theme'

/* eslint-disable react/display-name */

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      storage: 'none',
      storeGac: false,
    },
  })
  ReactGA.set({
    anonymizeIp: true,
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <SecTokenListUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LanguageProvider>
          <Web3ReactProvider connectors={connectors}>
            <Blocklist>
              <Updaters />
              <ThemeProvider>
                <ThemedGlobalStyle />
                <MuiThemeProvider>
                  <LocalizationProvider dateAdapter={DayJsUtils}>
                    <CookiesProvider>
                      <CustomHeaders />

                      <App />
                    </CookiesProvider>
                  </LocalizationProvider>
                </MuiThemeProvider>
              </ThemeProvider>
            </Blocklist>
          </Web3ReactProvider>
        </LanguageProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.unregister()

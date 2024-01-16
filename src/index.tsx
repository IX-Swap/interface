import React from 'react'
import ReactDOM from 'react-dom'
import 'svgxuse'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { CssBaseline } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import createGenerateClassName from '@mui/styles/createGenerateClassName'
import StylesProvider from '@mui/styles/StylesProvider'
import { AppStateProvider } from 'app/hooks/useAppState'
import { AppThemeProvider } from 'AppThemeProvider'
import { UserProvider } from 'auth/context'
import { Toast } from 'components/Toast'
import { ToastContainer } from 'components/ToastContainer/ToastContainer'
import { history } from 'config/history'
import { EntryPoint } from 'EntryPoint'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Router, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { setupFullStory } from 'setupFullStory'
import { setupGtagManager } from 'setupGtagManager'
import { setupSentry } from 'setupSentry'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from 'config/blockchain/constants'
import getLibrary from 'config/blockchain/getLibrary'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '4dcfae48e83be7804beb4adf6acaf2fb'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const generateClassName = createGenerateClassName({
  productionPrefix: 'ix'
})

setupSentry()
setupFullStory()
setupGtagManager()

const IXApp = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StylesProvider generateClassName={generateClassName}>
          <AppThemeProvider>
            {theme => (
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <ReactQueryCacheProvider queryCache={queryCache}>
                    <CssBaseline />
                    <UserProvider>
                      <Router history={history}>
                        <Web3ReactProvider getLibrary={getLibrary}>
                          <Web3ProviderNetwork getLibrary={getLibrary}>
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
                          </Web3ProviderNetwork>
                        </Web3ReactProvider>
                      </Router>
                    </UserProvider>
                  </ReactQueryCacheProvider>
                </ThemeProvider>
              </StyledEngineProvider>
            )}
          </AppThemeProvider>
        </StylesProvider>
      </LocalizationProvider>
    </WagmiConfig>
  )
}

ReactDOM.render(<IXApp />, document.getElementById('root'))

import React from "react"
import ReactGA from 'react-ga'

import { isMobile } from 'react-device-detect'
import { injected } from 'connectors'

import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { SUPPORTED_WALLETS } from 'constants/wallet'

import Option from 'components/WalletModal/Option'

import MetamaskIcon from 'assets/images/metamask.png'
import { optionCSS } from "react-select/dist/declarations/src/components/Option"

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export const ConnectionOptions = () => {
  const { activate, connector } = useWeb3React()

  const [walletView, setWalletView] = React.useState(WALLET_VIEWS.ACCOUNT)
  const [pendingWallet, setPendingWallet] = React.useState<AbstractConnector | undefined>()
  const [pendingError, setPendingError] = React.useState<boolean>()

  const isMetaMask = window.ethereum && window.ethereum.isMetaMask
  
  const tryActivation = React.useCallback(
    async (connector: AbstractConnector | undefined) => {
      let name = ''
      Object.keys(SUPPORTED_WALLETS).map((key) => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name)
        }
        return true
      })
      // log selected wallet

      const { ym } = window
      ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')

      ReactGA.event({
        category: 'Wallet',
        action: 'Change Wallet',
        label: name,
      })
      setPendingWallet(connector) // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
      if (connector) {
        try {
          await activate(connector, undefined, true)
        } catch (error) {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          } else {
            activate(connector) // a little janky...can't use setError because the connector isn't set
            setPendingError(true)
          }
        }
      }
    },
    [activate]
  )

  return (
    <div>
      {Object.entries(SUPPORTED_WALLETS).map(([key, option]) => {
        if (isMobile) {
          if (!(!window.web3 && !window.ethereum && option.mobile)) {
            return null
          }

          return <Option
            key={key}
            id={`connect-${key}`}
            active={option.connector && option.connector === connector}
            onClick={() => option.connector !== connector && !option.href && tryActivation(option.connector)}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
        }

        if (option.connector === injected) {
          if (option.name !== 'MetaMask') {
            return null
          }

          return <Option 
            id={`connect-${key}`}
            key={key}
            header="Install Meatamask"
            link={'https://metamask.io/'}
            icon={MetamaskIcon}
            color={'#FFFFFF'} 
            subheader={null} 
          />
        } else if ((option.name === 'MetaMask' && !isMetaMask) || (option.name === 'Injected' && isMetaMask)) {
          return null
        }

        return !isMobile && !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      })}
    </div>
  )
}

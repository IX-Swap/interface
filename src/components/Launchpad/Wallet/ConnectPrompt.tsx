import React from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'

import Modal from 'components/Modal'

import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'

import { ConnectionOptions } from './ConnectionOptions'
import { ConnectionLoader } from './ConnectionLoader'

import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

interface Props {
  onConnect: () => void
}

export const ConnectPrompt: React.FC<Props> = (props: Props) => {
  const { activate } = useWeb3React()

  const [showConnectModal, setShowConnectModal] = React.useState(false)

  const toggleModal = React.useCallback(() => setShowConnectModal(state => !state), [])
  
  const [walletView, setWalletView] = React.useState(WALLET_VIEWS.OPTIONS)
  const [pendingWallet, setPendingWallet] = React.useState<AbstractConnector | undefined>()
  const [pendingError, setPendingError] = React.useState<boolean>()

  const tryActivation = React.useCallback(
    async (connector: AbstractConnector | undefined) => {
      const wallet = Object.values(SUPPORTED_WALLETS)
        .find(wallet => wallet.connector === connector)!

      window.ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')
      ReactGA.event({ category: 'Wallet', action: 'Change Wallet', label: wallet.name })

      setPendingWallet(connector) // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }

      if (!connector) {
        return
      }

      try {
        await activate(connector, undefined, true)
        setWalletView(WALLET_VIEWS.ACCOUNT)

        toggleModal()

        props.onConnect()

      } catch (error) {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          activate(connector) // a little janky...can't use setError because the connector isn't set
          setPendingError(true)
        }
      }
    },
    [activate, toggleModal]
  )

  const onSelect = React.useCallback((option: WalletInfo) => tryActivation(option.connector), [tryActivation])

  return (
    <>
      <ConnectButton onClick={toggleModal}>
        <span className="title">Connect Wallet</span> <br />
        <span className="subtitle">Sign-up/Login</span>
      </ConnectButton>

      <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
        <ModalContainer>
          {walletView === WALLET_VIEWS.OPTIONS && (
            <>
              <ConnectionOptions onSelect={onSelect}/>
            </>
          )}

          {walletView === WALLET_VIEWS.PENDING && (
            <ConnectionLoader />
          )}

          <AgreementNotice>
            By connecting a wallet, you agree to IX Swap’s <a>Terms and Conditions</a> and 
            acknowledge that you have read and understood the IX Swap Privacy Policy.
          </AgreementNotice>
        </ModalContainer>
      </Modal>
    </>
  )
}


const ConnectButton = styled.button`
  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;

  padding: 0.5rem 3rem;

  text-align: center;

  cursor: pointer;

  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;

    line-height: 16px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.light};
  }

  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;

    line-height: 12px;
    letter-spacing: -0.02em;

    color: rgba(255, 255, 255, 0.6);
  }
`

const ModalContainer = styled.div`
  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 10px;

  padding: 2rem 4rem;
`

const AgreementNotice = styled.div`
  background: ${props => props.theme.launchpad.colors.accent};
  color: rgba(102, 102, 255, 0.7);

  border-radius: 6px;
  border: 1px solid rgba(102, 102, 255, 0.3);

  padding: 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 13px;
  letter-spacing: -0.02em;

  a {
    text-decoration: underline;
  }
`
import React from 'react'
import ReactGA from 'react-ga'

import styled from 'styled-components'

import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'

import { ConnectionOptions } from './ConnectionOptions'
import { ConnectionLoader } from './ConnectionLoader'

import { Connector } from '@web3-react/types'
import { useWeb3React } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect-v2'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { text13 } from 'components/LaunchpadMisc/typography'
import { Trans } from '@lingui/macro'
import { ButtonOutlined } from 'components/Button'
import Column from 'components/Column'
import { HeaderRow } from 'components/Table'
import { ContentWrapper, HoverText } from 'components/WalletModal/styleds'
import { isMobile } from 'react-device-detect'
import { TYPE } from 'theme'
import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
import { style } from 'styled-system'

export enum PromptView {
  options,
  optionsSecondary,
  pending,
  account,
}

interface Props {
  onConnect: () => void
  onClose: () => void
}

export const ConnectionDialog: React.FC<Props> = (props) => {
  const [walletView, setWalletView] = React.useState(PromptView.options)
  const [pendingWallet, setPendingWallet] = React.useState<Connector | undefined>()
  const [pendingError, setPendingError] = React.useState<boolean>()

  const tryActivation = async (connector: Connector | undefined) => {
    const wallet = Object.values(SUPPORTED_WALLETS).find((wallet) => wallet.connector === connector)

    window.ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')
    ReactGA.event({ category: 'Wallet', action: 'Change Wallet', label: wallet?.name ?? '' })

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(PromptView.pending)

    if (!connector) {
      return
    }

    try {
      await connector.activate()
      setWalletView(PromptView.account)

      props.onConnect()
    } catch (error) {
      connector.activate()
      setPendingError(true)
    }
  }

  const onSelect = React.useCallback((option: WalletInfo) => tryActivation(option.connector), [tryActivation])

  return (
    <ModalContainer>
      <ExitIconContainer onClick={props.onClose}>
        <CrossIcon />
      </ExitIconContainer>

      <ContentWrapper>
        {walletView === PromptView.options && (
          <>
            <ConnectionOptions onSelect={onSelect} />
          </>
        )}
        {walletView === PromptView.pending && <ConnectionLoader />}
        <AgreementNotice>
          By connecting a wallet, you agree to IX Swap’s
          <a href="https://ixswap.io/terms-and-conditions/" target="_blank" rel="noreferrer">
            {' '}
            Terms and Conditions
          </a>{' '}
          and acknowledge that you have read and understood the IX Swap
          <a href="https://ixswap.io/privacy-policy/" target="_blank" rel="noreferrer">
            {' '}
            Privacy Policy.
          </a>
        </AgreementNotice>
      </ContentWrapper>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 10px;
  padding: 2rem 4rem;
  position: relative;
`

const AgreementNotice = styled.div`
  background: ${(props) => props.theme.launchpad.colors.accent};
  color: rgba(102, 102, 255, 0.7);
  border-radius: 6px;
  border: 1px solid rgba(102, 102, 255, 0.3);
  padding: 1rem;

  ${text13}

  a {
    text-decoration: underline;
  }
`

const ExitIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.launchpad.colors.text.body};
  }
`

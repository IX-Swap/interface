import React from 'react'
import ReactGA from 'react-ga'

import styled, { useTheme } from 'styled-components'

import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'

import { ConnectionOptions } from './ConnectionOptions'
import { ConnectionLoader } from './ConnectionLoader'

import { Connector } from '@web3-react/types'
import { useWeb3React } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect-v2'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { text13, text14 } from 'components/LaunchpadMisc/typography'
import { Trans } from '@lingui/macro'
import { ButtonOutlined } from 'components/Button'
import Column from 'components/Column'
import { HeaderRow } from 'components/Table'
import { ContentWrapper, HoverText, OptionGrid } from 'components/WalletModal/styleds'
import { isMobile } from 'react-device-detect'
import { ExternalLink, TYPE } from 'theme'
import metamaskmobile from 'assets/images/metamaskmobile.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
import { style } from 'styled-system'
import { Text } from 'rebass'
import { AutoRow } from 'components/Row'
import { ReactComponent as TooltipIcon } from 'assets/images/infoBlue.svg'
import { Line } from 'components/Line'
import PendingView from 'components/WalletModal/PendingView'
import { useWhitelabelState } from 'state/whitelabel/hooks'

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

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export const ConnectionDialog: React.FC<Props> = (props) => {
  const [walletView, setWalletView] = React.useState(PromptView.options)
  const [pendingWallet, setPendingWallet] = React.useState<Connector | undefined>()
  const [pendingError, setPendingError] = React.useState<boolean>()
  const theme = useTheme()
  const { config } = useWhitelabelState()

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

  const handleInstallMetaMask = () => {
    window.location.href = 'https://metamask.io/'
  }
  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'
  const isMobileWithMetamask = isMobile && isMetamaskInstalled
  return (
    <ModalContainer style={{overflow: 'auto',  maxHeight: '90vh'}}>
      <PromptTitle>Connect your Wallet </PromptTitle>
      <ContentWrapper style={{ marginTop: '10px' }}>
        <AutoRow style={{ flexWrap: 'nowrap' }}>
          <Text style={{ fontSize: '13px', color: '#666680', fontWeight: '400', lineHeight: '19.5px' }}>
            <Trans>
              Connecting your wallet allows IX Swap to see your wallet address and, consequently, the funds you hold on
              the blockchain. This does not grant IX Swap the ability to manage or transfer your tokens; for that, you
              will be asked to sign a token approval.
              {/* By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
                  <ExternalLink href="https://ixswap.io/terms-and-conditions/">Terms and Conditions</ExternalLink> and
                  acknowledge that you have read and understood the{' '}
                  <ExternalLink href="https://ixswap.io/privacy-policy/">
                    {config?.name || 'IX Swap'} Privacy Policy
                  </ExternalLink>
                  . */}
            </Trans>
            <br /> <br />
            <Trans>Select your wallet from the options below to get started</Trans>
          </Text>
        </AutoRow>
      </ContentWrapper>
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
        {!isMobile && !isMetamaskInstalled && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              gap: '5px',
              border: '1px solid #FF616180',
              borderRadius: '6px',
              backgroundColor: '#FFF8F7',
              marginTop: '10px',
            }}
          >
            <p style={{ color: '#FF6161', fontSize: '13px', marginLeft: '8px' }}>
              Please install Metamask to use this wallet.
            </p>
          </div>
        )}
      </ContentWrapper>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <WalletInstallationLink onClick={handleInstallMetaMask}>I do not have a wallet yet</WalletInstallationLink>
        <TooltipIcon />
      </div>

      <Line style={{ marginTop: isMobile ? '20px' : '70px' }} />

      <div style={{ fontSize: '13px', justifyContent: 'center', marginTop: '20px', color: '#666680' }}>
        By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
        <ExternalLink style={{ color: '#6666FF' }} href="https://ixswap.io/terms-and-conditions/">
          Terms and Conditions
        </ExternalLink>{' '}
        and acknowledge that you have read and understood the{' '}
        <ExternalLink style={{ color: '#6666FF' }} href="https://ixswap.io/privacy-policy/">
          {config?.name || 'IX Swap'} Privacy Policy
        </ExternalLink>
        .
      </div>
    </ModalContainer>
  )
}

const PromptTitle = styled.div`
  margin-left: 16px;
  text-align: left;
  ${text14}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const ModalContainer = styled.div`
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 10px;
  padding: 2rem 2rem;
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

const WalletInstallationLink = styled.a`
  font-size: 13px;
  color: #6666ff;
  font-weight: 600;
  text-decoration: none; /* Remove underline */
  cursor: pointer; /* Change cursor to pointer on hover */
`

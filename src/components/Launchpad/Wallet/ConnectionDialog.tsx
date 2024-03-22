import React from 'react'
import ReactGA from 'react-ga'
import styled, { useTheme } from 'styled-components'
import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'
import { ConnectionOptions } from './ConnectionOptions'
import { Connector } from '@web3-react/types'
import { useWeb3React } from '@web3-react/core'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { text13, text14 } from 'components/LaunchpadMisc/typography'
import { Trans } from '@lingui/macro'
import { ButtonOutlined } from 'components/Button'
import Column from 'components/Column'
import { HeaderRow } from 'components/Table'
import { ContentWrapper, HoverText, OptionGrid } from 'components/WalletModal/styleds'
import { isMobile } from 'react-device-detect'
import { ExternalLink, TYPE } from 'theme'
import metamaskmobile from 'assets/images/metamask.png'
import trust from 'assets/images/trust.png'
import coinbase from 'assets/images/coinbase.png'
import { Text } from 'rebass'
import { AutoRow } from 'components/Row'
import { ReactComponent as TooltipIcon } from 'assets/images/infoBlue.svg'
import { Line } from 'components/Line'
import PendingView from 'components/WalletModal/PendingView'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import back from 'assets/images/newBack.svg'
import { MetaMask } from '@web3-react/metamask'

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
  const { config } = useWhitelabelState()
  const [showPendingScreen, setShowPendingScreen] = React.useState(false)
  const [userSelected, setUserSelected] = React.useState(false) // Define userSelected state

  const [isMetaMaskClicked, setIsMetaMaskClicked] = React.useState(false)

  const tryActivation = async (connector: Connector | undefined) => {
    const wallet = Object.values(SUPPORTED_WALLETS).find((wallet) => wallet.connector === connector)

    window.ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')
    ReactGA.event({ category: 'Wallet', action: 'Change Wallet', label: wallet?.name ?? '' })


    setWalletView(PromptView.pending)
    setShowPendingScreen(true)

    if (!connector) {
      return
    }

    try {
      await connector.activate()
      setWalletView(PromptView.account)
      props.onConnect()
      props.onClose()
    } catch (error) {
      connector.activate()

    }
  }

  const onSelect = React.useCallback(
    (option: WalletInfo) => {
      tryActivation(option.connector)
      if (option.connector instanceof MetaMask) {
        setIsMetaMaskClicked(true)
      } else {
        setIsMetaMaskClicked(false)
      }
      setUserSelected(true) // Set userSelected to true when user selects a wallet
    },
    [tryActivation]
  )

  const handleInstallMetaMask = () => {
    window.location.href = 'https://metamask.io/'
  }

  const handleBackToSelection = () => {
    setShowPendingScreen(false) // Hide pending screen
    setWalletView(PromptView.options) // Show wallet selection options
  }

  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'

  return (
    <ModalContainer style={{ overflow: 'auto', maxHeight: '90vh' }}>
      {walletView === PromptView.pending && showPendingScreen && isMetaMaskClicked ? (
        <>
          <PromptTitle>Connecting to Metamask.. </PromptTitle>
          <ContentWrapper>
            <AutoRow>
              <TextContent>
                <ConnectingContainer style={{ width: isMobile ? '264px' : '350px' }}>
                  <ConnectingImage src={metamaskmobile} alt="Metamask" />
                  <ConnectingText>Connecting...</ConnectingText>
                </ConnectingContainer>
                <BackToSelection onClick={handleBackToSelection}>
                  <BackIcon src={back} alt="Back Icon" />
                  <BackText>Back to wallet selection</BackText>
                </BackToSelection>
                <AgreementNotice>
                  <Line style={{ marginBottom: '20px' }} />
                  By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
                  <ExternalLink href="https://ixswap.io/terms-and-conditions/">Terms and Conditions</ExternalLink> and
                  acknowledge that you have read and understood the{' '}
                  <ExternalLink href="https://ixswap.io/privacy-policy/">
                    {config?.name || 'IX Swap'} Privacy Policy
                  </ExternalLink>
                  .
                </AgreementNotice>
              </TextContent>
            </AutoRow>
          </ContentWrapper>
          <ExitIconContainer onClick={props.onClose}>
            <CrossIcon />
          </ExitIconContainer>
        </>
      ) : (
        <>
          <PromptTitle>Connect your Wallet</PromptTitle>
          <ContentWrapper>
            <AutoRow>
              <TextContent>
                <Trans>
                  Connecting your wallet allows IX Swap to see your wallet address and, consequently, the funds you hold
                  on the blockchain. This does not grant IX Swap the ability to manage or transfer your tokens; for
                  that, you will be asked to sign a token approval.
                </Trans>
                <br />
                <br />
                <Trans>Select your wallet from the options below to get started</Trans>
              </TextContent>
            </AutoRow>
          </ContentWrapper>
          <ExitIconContainer onClick={props.onClose}>
            <CrossIcon />
          </ExitIconContainer>
          <ContentWrapper>
            {walletView === PromptView.options && <ConnectionOptions onSelect={onSelect} />}

            {/* {!isMobile && !isMetamaskInstalled && userSelected && (
              <MetamaskInstallAlert>Please install MetaMask to use this application.</MetamaskInstallAlert>
            )} */}
          </ContentWrapper>
          <InstallLinkContainer>
            <WalletInstallationLink onClick={handleInstallMetaMask}>I do not have a wallet yet</WalletInstallationLink>
            <TooltipIcon />
          </InstallLinkContainer>
          <Line />
          <AgreementNotice>
            By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
            <ExternalLink href="https://ixswap.io/terms-and-conditions/">Terms and Conditions</ExternalLink> and
            acknowledge that you have read and understood the{' '}
            <ExternalLink href="https://ixswap.io/privacy-policy/">
              {config?.name || 'IX Swap'} Privacy Policy
            </ExternalLink>
            .
          </AgreementNotice>
        </>
      )}
    </ModalContainer>
  )
}

const PromptTitle = styled.div`
  margin-left: 16px;
  text-align: left;
  margin-bottom: 18px;
  ${text14}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const ModalContainer = styled.div`
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 10px;
  padding: 2rem 1rem;
  position: relative;
`

const TextContent = styled(Text)`
  font-size: 13px;
  color: #666680;
  font-weight: 400;
  line-height: 19.5px;
`

const ConnectingContainer = styled.div`
  width: 350px;
  padding: 10px;
  background: #f7f7fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
`

const ConnectingImage = styled.img`
  margin-right: 10px;
  width: 22px;
  height: 22px;
`

const ConnectingText = styled.p`
  font-weight: bold;
`

const BackToSelection = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  align-items: center;
  margin-bottom: 140px;
`

const BackIcon = styled.img`
  width: 10px;
  height: 10px;
`

const BackText = styled.p`
  color: blue;
`

const AgreementNotice = styled.div`
  color: #666680;
  font-size: 13px;
  padding: 1rem;

  a {
    text-decoration: none;
    color: #6666ff;
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
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 28px;
`

const InstallLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`

const MetamaskInstallAlert = styled.div`
  display: flex;
  justify-content: left;
  gap: 5px;
  border: 1px solid #ff616180;
  border-radius: 6px;
  background-color: #fff8f7;
  color: #ff6161;
  font-size: 13px;
  margin-top: 10px;
  padding: 16px;
`

export default ConnectionDialog

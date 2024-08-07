import React from 'react'
import ReactGA from 'react-ga'
import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
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
import WalletConnectIcon from '../../../assets/images/walletConnectIcon.svg'
import { useAppDispatch } from 'state/hooks'
import { setWalletState } from 'state/wallet'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { getAddChainParameters } from 'chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'

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

const iconWalletMapping = {
  MetaMask: metamaskmobile,
  WalletConnect: WalletConnectIcon,
  'Coinbase Wallet': coinbase,
} as any

export const ConnectionDialog: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()

  const [walletView, setWalletView] = React.useState(PromptView.options)
  const { config } = useWhitelabelState()
  const [showPendingScreen, setShowPendingScreen] = React.useState(false)
  const [selectedWalletName, setSelectedWalletName] = React.useState<string>('')

  const tryActivation = async (connector: Connector | undefined) => {
    if (!connector) {
      return
    }

    const wallet = Object.values(SUPPORTED_WALLETS).find((wallet) => wallet.connector === connector)
    const defaultChain = ENV_SUPPORTED_TGE_CHAINS?.[0] || SupportedChainId.AMOY

    window.ym(84960586, 'reachGoal', 'commonMetamaskChosenAsWallet')
    ReactGA.event({ category: 'Wallet', action: 'Change Wallet', label: wallet?.name ?? '' })
    setWalletView(PromptView.pending)
    setShowPendingScreen(true)
    setSelectedWalletName(wallet?.name ?? '')

    try {
      if (connector instanceof CoinbaseWallet) {
        const chainParams = getAddChainParameters(defaultChain)

        await connector.activate(chainParams)
      } else {
        await connector.activate(defaultChain)
      }
      setWalletView(PromptView.account)
      dispatch(setWalletState({ isConnected: true, walletName: wallet?.name }))
      props.onConnect()
      props.onClose()
    } catch (error: any) {
      console.log('Error activating connector', error)
      if (error.code === 4902) {
        const formattedChainId = hexStripZeros(BigNumber.from(defaultChain).toHexString())
        const info = CHAIN_INFO[defaultChain]

        await window?.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: formattedChainId,
              chainName: info.chainName,
              rpcUrls: info.rpcUrls,
              nativeCurrency: info.nativeCurrency,
              blockExplorerUrls: info.blockExplorerUrls,
            },
          ],
        })

        // Reconnect again
        if (connector instanceof CoinbaseWallet) {
          const chainParams = getAddChainParameters(defaultChain)

          await connector.activate(chainParams)
        } else {
          await connector.activate(defaultChain)
        }

        setWalletView(PromptView.account)
        dispatch(setWalletState({ isConnected: true, walletName: wallet?.name }))
        props.onConnect()
        props.onClose()
      }
    }
  }

  const onSelect = React.useCallback(
    (option: WalletInfo) => {
      dispatch
      tryActivation(option.connector)
    },
    [tryActivation]
  )

  const handleInstallWallet = () => {
    window.location.href = 'https://www.ixswap.io/search?query=dapp'
  }

  const handleBackToSelection = () => {
    setShowPendingScreen(false) // Hide pending screen
    setWalletView(PromptView.options) // Show wallet selection options
  }

  return (
    <ModalContainer style={{ overflow: 'auto', maxHeight: '90vh' }}>
      {walletView === PromptView.pending && showPendingScreen ? (
        <>
          <PromptTitle>{`Connecting to ${selectedWalletName}..`}</PromptTitle>
          <ContentWrapper>
            <AutoRow>
              <TextContent>
                <ConnectingContainer style={{ width: isMobile ? '264px' : '350px' }}>
                  <ConnectingImage src={iconWalletMapping[selectedWalletName]} alt={selectedWalletName} />

                  <ConnectingText>Connecting...</ConnectingText>
                </ConnectingContainer>
                <BackToSelection onClick={handleBackToSelection}>
                  <BackIcon src={back} alt="Back Icon" />
                  <BackText>Back to wallet selection</BackText>
                </BackToSelection>
                <AgreementNotice>
                  <Line style={{ marginBottom: '20px' }} />
                  By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
                  <ExternalLink href={config?.termsAndConditionsUrl ?? 'https://ixswap.io/terms-and-conditions/'}>
                    Terms and Conditions
                  </ExternalLink>{' '}
                  and acknowledge that you have read and understood the{' '}
                  <ExternalLink href={config?.privacyPolicyUrl ?? 'https://ixswap.io/privacy-policy/'}>
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
                  Connecting your wallet allows {config?.name || 'IX Swap'} to see your wallet address and,
                  consequently, the funds you hold on the blockchain. This does not grant {config?.name || 'IX Swap'}{' '}
                  the ability to manage or transfer your tokens; for that, you will be asked to sign a token approval.
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
            <WalletInstallationLink onClick={handleInstallWallet}>I do not have a wallet yet</WalletInstallationLink>
            <TooltipIcon />
          </InstallLinkContainer>
          <Line />
          <AgreementNotice>
            By connecting a wallet, you agree to {config?.name || 'IX Swap'}’s{' '}
            <ExternalLink href={config?.termsAndConditionsUrl ?? 'https://ixswap.io/terms-and-conditions/'}>
              Terms and Conditions
            </ExternalLink>{' '}
            and acknowledge that you have read and understood the{' '}
            <ExternalLink href={config?.privacyPolicyUrl ?? 'https://ixswap.io/privacy-policy/'}>
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

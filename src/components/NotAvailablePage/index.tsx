// Import necessary libraries and components
import React from 'react'
import { Trans, t } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import ethereumIcon from 'assets/images/ethereum-clear-logo.svg'
import polygonIcon from 'assets/images/polygon.svg'
import { useWeb3React } from '@web3-react/core'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { SupportedChainId } from 'constants/chains'
import { ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Text } from 'rebass'

// Import styled components
import {
  Container,
  Title,
  Info,
  NetworksRow,
  NetworkCard,
  InfoRows,
  PlaygroundBadge,
  ConnectWalletContainer,
} from './styled'
import Modal from 'components/Modal'
import { ConnectionDialog } from 'components/Launchpad/Wallet/ConnectionDialog'

// Define the NotAvailablePage component
export const NotAvailablePage = () => {
  const { chainId, provider, account } = useWeb3React()
  const { pathname } = useLocation()
  const [cookies] = useCookies(['announcementsSeen'])
  const { config } = useWhitelabelState()
  const toggleWalletModal = useWalletModalToggle()
  const [showConnectModal, setShowConnectModal] = React.useState(false)
  const toggleModal = React.useCallback(() => setShowConnectModal((state) => !state), [])

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain && provider && provider?.provider?.isMetaMask) {
      switchToNetwork({ provider, chainId: targetChain })
    } else {
    }
  }

  const onConnect = React.useCallback(() => {
    console.log('Connected')
  }, [])

  if (!account) {
    return (
      <ConnectWalletContainer hasAnnouncement={!cookies.announcementsSeen}>
        <Text>
          <Trans>Welcome to {config?.name || 'IX Swap'}</Trans>
        </Text>
        <div>
          Please Connect <br /> your Wallet to use <br /> the Application.
        </div>
        {/* <div>Please connect your wallet to use the application.</div> */}
        {/* <ButtonIXSGradient onClick={toggleModal}>Connect Wallet</ButtonIXSGradient> */}
        <PinnedContentButton style={{ boxShadow: '0px 16px 16px 0px #6666FF21' }} onClick={toggleModal}>
          <Text className="connect-wallet-button">
            <Trans>Connect Wallet</Trans>
          </Text>
        </PinnedContentButton>
        <span>
          While your wallet is not connected, you can see our New <br />
          <a
            style={{ color: '#6666FF', textDecoration: 'none' }}
            href="https://ixswap.defiterm.io/"
            target="_blank"
            rel="noreferrer"
          >
            Staking Program
          </a>
          ,&nbsp;
          <a
            style={{ color: '#6666FF', textDecoration: 'none' }}
            href="https://ixswap.defiterm.io/"
            target="_blank"
            rel="noreferrer"
          >
            Liquidity Mining on Polygon
          </a>
          &nbsp;and&nbsp; <br />
          <a
            style={{ color: '#6666FF', textDecoration: 'none' }}
            href="https://app.uniswap.org/#/add/v2/ETH/0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4?chain=polygon"
            target="_blank"
            rel="noreferrer"
          >
            Liquidity Mining on Ethereum
          </a>
          .
        </span>
        <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
          <ConnectionDialog onConnect={onConnect} onClose={toggleModal} />
        </Modal>
      </ConnectWalletContainer>
    )
  }

  if (!provider?.provider?.isMetaMask) {
    return (
      <Container>
        <Title>
          <Trans>{`${config?.name || 'IX Swap'} is not available`}</Trans>
          <br /> <Trans>{`on this Blockchain network`}</Trans>
        </Title>
        <Info>
          <Trans>
            You have connected to Metamask through WalletConnect. Please switch the network in your Metamask wallet in your phone.
          </Trans>
        </Info>
      </Container>
    )
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

  return (
    <Container>
      <Title>
        <Trans>{`${config?.name || 'IX Swap'} is not available`}</Trans>
        <br /> <Trans>{`on this Blockchain network`}</Trans>
      </Title>
      <Info>
        <Trans>{`${config?.name || 'IX Swap'} is available only on:`}</Trans>
      </Info>

      <NetworksRow elements={farming ? chains.length + 1 : chains.length}>
        {(chains.includes(SupportedChainId.MAINNET) || farming) && (
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.MAINNET)}>
            <img src={ethereumIcon} alt="ethereumIcon" />
            Ethereum Mainnet
          </NetworkCard>
        )}
        {chains.includes(SupportedChainId.KOVAN) && (
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.KOVAN)}>
            <PlaygroundBadge>
              <div>
                <Trans>Playground</Trans>
              </div>
            </PlaygroundBadge>
            <img src={ethereumIcon} alt="ethereumIcon" />
            Kovan Testnet
          </NetworkCard>
        )}
        {chains.includes(SupportedChainId.MATIC) && (
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.MATIC)}>
            <img src={polygonIcon} alt="polygonIcon" />
            Polygon Mainnet
          </NetworkCard>
        )}
        {chains.includes(SupportedChainId.MUMBAI) && (
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.MUMBAI)}>
            <img src={polygonIcon} alt="polygonIcon" />
            Mumbai Testnet
          </NetworkCard>
        )}
      </NetworksRow>
      <InfoRows>
        {(chains.includes(SupportedChainId.MAINNET) || farming) && (
          <Info>
            <li>
              <Trans>
                Switch to<b> Ethereum Mainnet</b> if you have ongoing Staking or Vesting there
              </Trans>
            </li>
          </Info>
        )}
        {chains.includes(SupportedChainId.KOVAN) && (
          <Info>
            <li>
              <Trans>
                Switch to<b> Kovan Testnet</b> if you want to see the demo playground
              </Trans>
            </li>
          </Info>
        )}
        {chains.includes(SupportedChainId.MATIC) && (
          <Info>
            <li>
              <Trans>
                Switch to<b> Polygon Mainnet</b> to get full functionality
              </Trans>
            </li>
          </Info>
        )}
        {chains.includes(SupportedChainId.MUMBAI) && (
          <Info>
            <li>
              <Trans>
                Switch to<b> Mumbai Testnet</b> to get full functionality
              </Trans>
            </li>
          </Info>
        )}
      </InfoRows>
    </Container>
  )
}

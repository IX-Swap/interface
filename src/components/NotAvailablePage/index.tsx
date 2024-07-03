import React from 'react'
import { Trans } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Text } from 'rebass'
import { useWeb3React } from '@web3-react/core'

import { switchToNetwork } from 'hooks/switchToNetwork'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { PinnedContentButton } from 'components/Button'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import {
  Container,
  Title,
  Info,
  NetworksRow,
  NetworkCard,
  InfoRows,
  ConnectWalletContainer,
} from './styled'
import Modal from 'components/Modal'
import { ConnectionDialog } from 'components/Launchpad/Wallet/ConnectionDialog'
import { PRODUCTION_APP_URL } from 'config'


function arrayToString(arr: string[]) {
  if (arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return arr.join(' or ')

  const lastItem = arr.pop()
  return `${arr.join(', ')} or ${lastItem}`
}

// Define the NotAvailablePage component
export const NotAvailablePage = () => {
  const { chainId, provider, account } = useWeb3React()
  const { pathname } = useLocation()
  const [cookies] = useCookies(['announcementsSeen'])
  const { config } = useWhitelabelState()
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

  const network = window.location.href.includes(PRODUCTION_APP_URL) ? 'Polygon' : 'Amoy'

  if (!provider?.provider?.isMetaMask) {
    return (
      <Container>
        <Title>
          <Trans>{`${config?.name || 'IX Swap'} is not available`}</Trans>
          <br /> <Trans>{`on this Blockchain network`}</Trans>
        </Title>
        <Info>
          <Trans>
            You have connected to Metamask through WalletConnect. Please switch the network to {network} in your wallet.
          </Trans>
        </Info>
      </Container>
    )
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)

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
        {chains.map((chain) => (
          <NetworkCard onClick={() => changeNetwork(chain)} key={chain}>
            <img src={CHAIN_INFO[chain].logoUrl} alt="icon" />
            {CHAIN_INFO[chain].chainName}
          </NetworkCard>
        ))}
      </NetworksRow>

      <InfoRows>
        <div>
          Switch to <b style={{ color: '#292933' }}>{arrayToString(chainsNames)}</b>
        </div>
        <div>to get full functionality</div>
      </InfoRows>
    </Container>
  )
}

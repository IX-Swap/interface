import React from 'react'
import { Trans } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Text } from 'rebass'
import { useWeb3React } from 'connection/web3reactShim'

import { switchToNetwork } from 'hooks/switchToNetwork'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { PinnedContentButton } from 'components/Button'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows, ConnectWalletContainer } from './styled'
import Modal from 'components/Modal'
import { ConnectionDialog } from 'components/Launchpad/Wallet/ConnectionDialog'
import { PRODUCTION_APP_URL } from 'config'

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

        {config?.isIxSwap ? (
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
        ) : null}

        <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
          <ConnectionDialog onConnect={onConnect} onClose={toggleModal} />
        </Modal>
      </ConnectWalletContainer>
    )
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [SupportedChainId.BASE]
  const chainsNames = chains.map((chain) => CHAIN_INFO[chain].chainName)

  if (!provider?.provider?.isMetaMask) {
    return (
      <Container>
        <Title>
          Connect to the Right
          <br />
          Blockchain Network
        </Title>
        <Info>
          <Trans>
            Please switch the network to{' '}
            {chainsNames.map((chainName, index) => (
              <span key={index}>
                <b style={{ color: '#292933' }}>{chainName}</b>
                {index < chainsNames.length - 2 ? ', ' : ''}
                {index === chainsNames.length - 2 ? ' or ' : ''}
              </span>
            ))}{' '}
            in your wallet.
          </Trans>
        </Info>
      </Container>
    )
  }

  return (
    <Container>
      <Title>
        Connect to the Right
        <br />
        Blockchain Network
      </Title>
      <Info>Available Blockchain Network:</Info>

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
          Switch to{' '}
          {chainsNames.map((chainName, index) => (
            <span key={index}>
              <b style={{ color: '#292933' }}>{chainName}</b>
              {index < chainsNames.length - 2 ? ', ' : ''}
              {index === chainsNames.length - 2 ? ' or ' : ''}
            </span>
          ))}
        </div>
        <div>to get full functionality</div>
      </InfoRows>
    </Container>
  )
}

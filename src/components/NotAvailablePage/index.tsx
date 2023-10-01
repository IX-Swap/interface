import React from 'react'
import { Trans, t } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import ethereumIcon from 'assets/images/ethereum-clear-logo.svg'
import polygonIcon from 'assets/images/polygon.svg'
import { useActiveWeb3React } from 'hooks/web3'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { SupportedChainId } from 'constants/chains'
import { ButtonIXSGradient } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'

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

export const NotAvailablePage = () => {
  const { chainId, provider, account } = useActiveWeb3React()
  const { pathname } = useLocation()
  const [cookies] = useCookies(['annoucementsSeen'])
  const { config } = useWhitelabelState()
  const toggleWalletModal = useWalletModalToggle()
  const [showConnectModal, setShowConnectModal] = React.useState(false)
  const toggleModal = React.useCallback(() => setShowConnectModal((state) => !state), [])

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain && provider?.isMetaMask) {
      switchToNetwork({ provider, chainId: targetChain })
    }
  }

  const onConnect = React.useCallback(() => {
    console.log('Connected')
  }, [])

  if (!account) {
    return (
      <ConnectWalletContainer hasAnnouncement={!cookies.annoucementsSeen}>
        <div>
          <Trans>Welcome to {config?.name || 'IX Swap'}</Trans>
        </div>
        <div>Please connect your wallet to use the application.</div>
        <ButtonIXSGradient onClick={toggleModal}>Connect Wallet</ButtonIXSGradient>
        <span>
          While your wallet is not connected, you can see our{' '}
          <a href="https://ixswap.defiterm.io/" target="_blank" rel="noreferrer">
            New Staking Program
          </a>
          ,&nbsp;
          <a href="https://ixswap.defiterm.io/" target="_blank" rel="noreferrer">
            Liquidity Mining on Polygon
          </a>
          &nbsp;and&nbsp;
          <a
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

  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

  return (
    <Container>
      <Title>
        {t`${config?.name || 'IX Swap'} is not available`}
        <br /> {t`on this Blockchain network`}
      </Title>
      <Info>{t`${config?.name || 'IX Swap'} is available only on:`}</Info>

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

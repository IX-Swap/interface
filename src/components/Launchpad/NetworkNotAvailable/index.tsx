import React from 'react'
import { Trans, t } from '@lingui/macro'
import { useLocation } from 'react-router-dom'
import ethereumIcon from 'assets/images/ethereum-clear-logo.svg'
import polygonIcon from 'assets/images/polygon.svg'
import { useActiveWeb3React } from 'hooks/web3'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { SupportedChainId } from 'constants/chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Container, Title, Info, NetworksRow, NetworkCard, InfoRows, PlaygroundBadge } from './styled'
import { PRODUCTION_APP_URL } from 'config'

export const NetworkNotAvailable = () => {
  const { chainId, provider } = useActiveWeb3React()
  const { pathname } = useLocation()

  const { config } = useWhitelabelState()

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain && provider && provider?.provider?.isMetaMask) {
      switchToNetwork({ provider, chainId: targetChain })
    }
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

  const network = window.location.href.includes(PRODUCTION_APP_URL) ? 'Polygon' : 'Mumbai'

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

  return (
    <Container>
      <Title>
        <Trans>{`${config?.name || 'IX Swap'} is not available 2`}</Trans>
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
        {chains.includes(SupportedChainId.AMOY) && (
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.AMOY)}>
            <img src={polygonIcon} alt="polygonIcon" />
            Polygon Amoy Testnet
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
        {chains.includes(SupportedChainId.AMOY) && (
          <Info>
            <li>
              <Trans>
                Switch to<b> Amoy Testnet</b> to get full functionality
              </Trans>
            </li>
          </Info>
        )}
      </InfoRows>
    </Container>
  )
}

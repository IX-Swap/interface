import React from 'react'
import { Trans, t } from '@lingui/macro'
import { useLocation } from 'react-router-dom'

import ethereumIcon from 'assets/images/ethereum-clear-logo.svg'
import polygonIcon from 'assets/images/polygon.svg'
import { useActiveWeb3React } from 'hooks/web3'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { SupportedChainId } from 'constants/chains'
import { ButtonIXSGradient } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

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

export const NotAvailablePage = () => {
  const { chainId, library, account } = useActiveWeb3React()
  const { pathname } = useLocation()

  const toggleWalletModal = useWalletModalToggle()

  const farming = ['/vesting', '/staking'].includes(pathname)

  const changeNetwork = (targetChain: number) => {
    if (chainId !== targetChain && library && library?.provider?.isMetaMask) {
      switchToNetwork({ library, chainId: targetChain })
    }
  }

  if (!account) {
    return (
      <ConnectWalletContainer>
        <div>
          <Trans>You have to connect wallet to use this page</Trans>
        </div>
        <ButtonIXSGradient onClick={toggleWalletModal}>Connect Wallet</ButtonIXSGradient>
      </ConnectWalletContainer>
    )
  }

  const chains = ENV_SUPPORTED_TGE_CHAINS || [42]

  return (
    <Container>
      <Title>
        {t`IXSwap is not available`}
        <br /> {t`on this Blockchain network`}
      </Title>
      <Info>{t`IXSwap is available only on:`}</Info>

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
      </InfoRows>
    </Container>
  )
}

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

import {
  Container,
  Title,
  Info,
  NetworksRow,
  NetworkCard,
  InfoRows,
  PlaygroundBadge,
  KovanRow,
  ConnectWalletContainer,
} from './styled'

export const NotAvailablePage = () => {
  const { chainId, library, account } = useActiveWeb3React()
  const { pathname } = useLocation()

  const toggleWalletModal = useWalletModalToggle()

  const onlyKovan = !['/vesting', '/staking'].includes(pathname)

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

  return (
    <Container>
      <Title>
        {onlyKovan ? (
          t`Coming soon on Polygon`
        ) : (
          <>
            {t`IXSwap is not available`}
            <br /> {t`on this Blockchain network`}
          </>
        )}
      </Title>
      <Info>{onlyKovan ? t`To use our playground you might switch to:` : t`IXSwap is available only on:`}</Info>
      {onlyKovan ? (
        <KovanRow>
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.KOVAN)}>
            <PlaygroundBadge>
              <div>
                <Trans>Playground</Trans>
              </div>
            </PlaygroundBadge>
            <img src={ethereumIcon} alt="ethereumIcon" />
            Kovan Testnet
          </NetworkCard>
        </KovanRow>
      ) : (
        <NetworksRow>
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.MAINNET)}>
            <img src={ethereumIcon} alt="ethereumIcon" />
            Ethereum Mainnet
          </NetworkCard>
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.KOVAN)}>
            <PlaygroundBadge>
              <div>
                <Trans>Playground</Trans>
              </div>
            </PlaygroundBadge>
            <img src={ethereumIcon} alt="ethereumIcon" />
            Kovan Testnet
          </NetworkCard>
          <NetworkCard onClick={() => changeNetwork(SupportedChainId.MATIC)}>
            <img src={polygonIcon} alt="polygonIcon" />
            Polygon Mainnet
          </NetworkCard>
        </NetworksRow>
      )}
      {!onlyKovan && (
        <InfoRows>
          <Info>
            <li>
              <Trans>
                Switch to<b> Ethereum Mainnet</b> if you have ongoing Staking or Vesting there
              </Trans>
            </li>
          </Info>
          <Info>
            <li>
              <Trans>
                Switch to<b> Kovan Testnet</b> if you want to see the demo playground
              </Trans>
            </li>
          </Info>
          <Info>
            <li>
              <Trans>
                Switch to<b> Polygon Mainnet</b> to get full functionality
              </Trans>
            </li>
          </Info>
        </InfoRows>
      )}
    </Container>
  )
}

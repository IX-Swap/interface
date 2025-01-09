import React from 'react'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { ConnectWalletContainer } from './styled'
import { PinnedContentButton } from 'components/Button'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import CustomLineLiffConnectButton from './CustomLineLiffConnectButton'
import { isLineLiff } from 'utils'

const ConnectWalletCard = () => {
  const { config } = useWhitelabelState()
  const { openConnectModal } = useConnectModal()

  const renderConnectButton = () => {
    if (isLineLiff) {
      return <CustomLineLiffConnectButton />
    }

    if (openConnectModal) {
      return (
        <PinnedContentButton style={{ boxShadow: '0px 16px 16px 0px #6666FF21' }} onClick={openConnectModal}>
          <Text className="connect-wallet-button">
            <Trans>Connect Wallet</Trans>
          </Text>
        </PinnedContentButton>
      )
    }

    return null
  }

  return (
    <ConnectWalletContainer>
      <Text>
        <Trans>Welcome to {config?.name || 'IX Swap'}</Trans>
      </Text>
      <div>
        Please Connect <br /> your Wallet to use <br /> the Application.
      </div>
      {renderConnectButton()}
      {config?.isIxSwap && !isLineLiff ? (
        <span>
          While your wallet is not connected, you can see our New <br />
          <a
            style={{ color: '#6666FF', textDecoration: 'none' }}
            href="https://staking.ixswap.io/"
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
    </ConnectWalletContainer>
  )
}

export default ConnectWalletCard

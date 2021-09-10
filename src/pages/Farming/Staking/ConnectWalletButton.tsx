import React from 'react'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { UseWeb3Browser } from '../styleds'

export const ConnectWalletButton = () => {
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()

  const connectWallet = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingConnectWalletClicked')
    toggleWalletModal()
  }

  return (
    <>
      <ButtonIXSWide onClick={connectWallet} disabled={!!account} data-testid="connect-wallet-btn">
        <Trans>Connect Wallet</Trans>
      </ButtonIXSWide>
    </>
  )
}

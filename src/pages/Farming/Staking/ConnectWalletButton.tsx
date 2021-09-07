import React from 'react'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'
import { useActiveWeb3React } from 'hooks/web3'

export const ConnectWalletButton = () => {
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  return (
    <ButtonIXSWide onClick={toggleWalletModal} disabled={!!account} data-testid="connect-wallet-btn">
      <Trans>Connect Wallet</Trans>
    </ButtonIXSWide>
  )
}

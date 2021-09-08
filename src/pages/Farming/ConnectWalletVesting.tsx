import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { Text } from 'rebass'
import { useWalletModalToggle } from 'state/application/hooks'
import { VestingTextWrapper } from './styleds'

export const ConnectWalletVesting = () => {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const connectWallet = () => {
    const {
      Ya: { Metrika2 },
    } = window
    Metrika2(84960586, 'reachGoal', 'bigVestingConnectWalletClicked')
    toggleWalletModal()
  }

  return (
    <>
      <VestingTextWrapper onClick={connectWallet}>
        <Text fontSize={'18px'} lineHeight={'27px'} color={theme.text2}>
          <Trans>Connect your wallet to see your vesting progress</Trans>
        </Text>
      </VestingTextWrapper>

      <ButtonIXSWide
        onClick={connectWallet}
        disabled={!!account}
        data-testid="connect-wallet-in-vesting"
        style={{ width: '308px' }}
      >
        <Trans>Connect Wallet</Trans>
      </ButtonIXSWide>
    </>
  )
}

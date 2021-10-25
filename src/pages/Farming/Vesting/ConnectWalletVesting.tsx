import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { isMobile } from 'react-device-detect'

import { Text } from 'rebass'
import { useWalletModalToggle } from 'state/application/hooks'
import { VestingTextWrapper, UseWeb3Browser } from '../styleds'

export const ConnectWalletVesting = () => {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const connectWallet = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'bigVestingConnectWalletClicked')
    toggleWalletModal()
  }

  return (
    <>
      <VestingTextWrapper onClick={connectWallet}>
        <Text fontSize={'18px'} lineHeight={'27px'} color={theme.text2}>
          <Trans>Connect to your Web3 wallet to view your vesting progress </Trans>
        </Text>
      </VestingTextWrapper>

      <ButtonIXSWide
        onClick={connectWallet}
        disabled={!!account}
        data-testid="connect-wallet-in-vesting"
        style={{ maxWidth: '308px', width: '100%' }}
      >
        <Trans>Connect Wallet</Trans>
      </ButtonIXSWide>
      {isMobile && (
        <UseWeb3Browser>You can use web3 browser in Metamask app or another one to connect your wallet.</UseWeb3Browser>
      )}
    </>
  )
}

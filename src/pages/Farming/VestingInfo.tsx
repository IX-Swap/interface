import React from 'react'
import { ConnectWalletVesting } from './ConnectWalletVesting'
import { VestingInfoWrapper } from './styleds'
import { VestingState } from './Vesting'
import { VestingValid } from './VestingValid'
import { ZeroBalanceVesting } from './ZeroBalanceVesting'

export const VestingInfo = ({ state }: { state: VestingState }) => {
  return (
    <VestingInfoWrapper>
      {state === VestingState.CONNECT_WALLET && <ConnectWalletVesting />}
      {state === VestingState.ZERO_BALANCE && <ZeroBalanceVesting />}
      {state === VestingState.VALID && <VestingValid />}
    </VestingInfoWrapper>
  )
}

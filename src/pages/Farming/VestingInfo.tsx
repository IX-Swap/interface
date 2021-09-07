import React from 'react'
import { ConnectWalletVesting } from './ConnectWalletVesting'
import { VestingInfoWrapper } from './styleds'
import { VestingStatus } from './Vesting'
import { VestingValid } from './VestingValid'
import { ZeroBalanceVesting } from './ZeroBalanceVesting'

export const VestingInfo = ({ state }: { state: VestingStatus }) => {
  return (
    <VestingInfoWrapper>
      {state === VestingStatus.CONNECT_WALLET && <ConnectWalletVesting />}
      {state === VestingStatus.ZERO_BALANCE && <ZeroBalanceVesting />}
      {state === VestingStatus.VALID && <VestingValid />}
    </VestingInfoWrapper>
  )
}

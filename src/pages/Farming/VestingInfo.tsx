import React, { useState } from 'react'
import { ConnectWalletVesting } from './ConnectWalletVesting'
import { VestingInfoWrapper } from './styleds'
import { ZeroBalanceVesting } from './ZeroBalanceVesting'

enum VestingState {
  CONNECT_WALLET = 'CONNECT_WALLET',
  ZERO_BALANCE = 'ZERO_BALANCE',
  VALID = 'VALID',
}
export const VestingInfo = () => {
  const [vestingState, setVestingState] = useState(VestingState.ZERO_BALANCE)
  return (
    <VestingInfoWrapper>
      {vestingState === VestingState.CONNECT_WALLET && <ConnectWalletVesting />}
      {vestingState === VestingState.ZERO_BALANCE && <ZeroBalanceVesting />}
    </VestingInfoWrapper>
  )
}

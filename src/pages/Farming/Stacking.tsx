import React, { useState } from 'react'
import { PromoTokenCard } from './PromoTokenCard'
import { StackingDescription } from './StackingDescription'
import { StackingWrapper } from './styleds'

enum StackingState {
  CONNECT_WALLET = 'CONNECT_WALLET',
  NO_IXS = 'NO_IXS',
  NO_STAKE = 'NO_STAKE',
  STAKING = 'STAKING',
}

export const Stacking = () => {
  const [stackingState, setStackingState] = useState(StackingState.CONNECT_WALLET)
  return (
    <StackingWrapper>
      {stackingState !== StackingState.STAKING && <PromoTokenCard />}
      {stackingState !== StackingState.STAKING && <StackingDescription />}
    </StackingWrapper>
  )
}

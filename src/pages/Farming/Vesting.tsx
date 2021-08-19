import { LoaderThin } from 'components/Loader/LoaderThin'
import React from 'react'
import { useVestingStatus } from 'state/vesting/hooks'
import { VestingWrapper } from './styleds'
import { VestingInfo } from './VestingInfo'
import { VestingTable } from './VestingTable'

export enum VestingState {
  LOADING = 'LOADING',
  CONNECT_WALLET = 'CONNECT_WALLET',
  ZERO_BALANCE = 'ZERO_BALANCE',
  VALID = 'VALID',
}

export const Vesting = () => {
  const vestingState = useVestingStatus()

  return (
    <VestingWrapper>
      {vestingState === VestingState.LOADING && <LoaderThin size={128} />}
      {vestingState !== VestingState.LOADING && (
        <>
          <VestingInfo state={vestingState} />
          <VestingTable vestingStatus={vestingState} />
        </>
      )}
    </VestingWrapper>
  )
}

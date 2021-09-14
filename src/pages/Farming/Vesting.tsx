import { LoaderThin } from 'components/Loader/LoaderThin'
import React from 'react'
import { useVestingState, useVestingStatus } from 'state/vesting/hooks'
import { LoaderContainer, VestingWrapper } from './styleds'
import { VestingInfo } from './VestingInfo'
import { VestingSearch } from './VestingSearch'
import { VestingTable } from './VestingTable'

export enum VestingStatus {
  LOADING = 'LOADING',
  CONNECT_WALLET = 'CONNECT_WALLET',
  ZERO_BALANCE = 'ZERO_BALANCE',
  VALID = 'VALID',
}

export const Vesting = () => {
  const { vestingStatus } = useVestingStatus()
  const { loadingVesting } = useVestingState()

  return (
    <>
      <VestingSearch />
      <VestingWrapper>
        {(loadingVesting || vestingStatus === VestingStatus.LOADING) && (
          <LoaderContainer>
            <LoaderThin size={96} />
          </LoaderContainer>
        )}
        {vestingStatus !== VestingStatus.LOADING && (
          <>
            <VestingInfo state={vestingStatus} />
            <VestingTable vestingStatus={vestingStatus} />
          </>
        )}
      </VestingWrapper>
    </>
  )
}

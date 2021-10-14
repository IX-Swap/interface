import { LoaderThin } from 'components/Loader/LoaderThin'
import React from 'react'
import { useUpdateVestingState, useVestingState } from 'state/vesting/hooks'
import { LoaderContainer, VestingWrapper } from '../styleds'
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
  useUpdateVestingState() // watching for account and address changes
  const { loadingVesting, vestingStatus } = useVestingState()

  return (
    <>
      <VestingSearch />
      {(loadingVesting || vestingStatus === VestingStatus.LOADING) && (
        <LoaderContainer>
          <LoaderThin size={96} />
        </LoaderContainer>
      )}
      <>
        {vestingStatus !== VestingStatus.LOADING && (
          <VestingWrapper>
            <VestingInfo state={vestingStatus} />
            <VestingTable vestingStatus={vestingStatus} />
          </VestingWrapper>
        )}
      </>
    </>
  )
}

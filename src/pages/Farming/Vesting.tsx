import React from 'react'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useVestingState, useVestingStatus } from 'state/vesting/hooks'
import { VestingWrapper, LoaderContainer } from './styleds'
import { VestingInfo } from './VestingInfo'
import { VestingTable } from './VestingTable'
import { VestingSearch } from './VestingSearch'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'

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
        {vestingStatus === VestingStatus.LOADING && <LoaderThin size={128} />}
        {vestingStatus !== VestingStatus.LOADING && (
          <>
            {loadingVesting && (
              <LoaderContainer>
                <LoaderThin size={96} />
              </LoaderContainer>
            )}
            <VestingInfo state={vestingStatus} />
            <VestingTable vestingStatus={vestingStatus} />
          </>
        )}
      </VestingWrapper>
    </>
  )
}

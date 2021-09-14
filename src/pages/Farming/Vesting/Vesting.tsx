import React, { useEffect, useMemo } from 'react'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { usePrivateBuyers, useVestingState, useVestingStatus } from 'state/vesting/hooks'
import { VestingWrapper, LoaderContainer } from '../styleds'
import { VestingInfo } from './VestingInfo'
import { VestingTable } from './VestingTable'
import { VestingSearch } from './VestingSearch'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PrivateBuyer } from './PrivateBuyer'
import { useActiveWeb3React } from 'hooks/web3'

export enum VestingStatus {
  LOADING = 'LOADING',
  CONNECT_WALLET = 'CONNECT_WALLET',
  ZERO_BALANCE = 'ZERO_BALANCE',
  VALID = 'VALID',
}

export const Vesting = () => {
  const { vestingStatus } = useVestingStatus()
  const { loadingVesting, privateBuyers } = useVestingState()
  const { account } = useActiveWeb3React()

  const getPrivateBuyers = usePrivateBuyers()

  useEffect(() => {
    getPrivateBuyers()
  }, [])

  const isPrivateBuyer = useMemo(
    () => vestingStatus === VestingStatus.ZERO_BALANCE && privateBuyers.includes(account || ''),
    [privateBuyers, vestingStatus]
  )

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
            {isPrivateBuyer ? (
              <PrivateBuyer />
            ) : (
              <>
                <VestingInfo state={vestingStatus} />
                <VestingTable vestingStatus={vestingStatus} />
              </>
            )}
          </>
        )}
      </VestingWrapper>
    </>
  )
}

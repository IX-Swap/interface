import { LoaderThin } from 'components/Loader/LoaderThin'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useMemo } from 'react'
import { useIsPrivateBuyer, useUpdateVestingState, useVestingState } from 'state/vesting/hooks'
import { LoaderContainer, VestingWrapper } from '../styleds'
import { PrivateBuyer } from './PrivateBuyer'
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
  const { loadingVesting, privateBuyer, customVestingAddress, vestingStatus } = useVestingState()
  const { account } = useActiveWeb3React()

  const getIsPrivateBuyer = useIsPrivateBuyer()

  useEffect(() => {
    if (account) {
      getIsPrivateBuyer(account)
    }
  }, [account])

  const isPrivateBuyer = useMemo(
    () =>
      vestingStatus === VestingStatus.ZERO_BALANCE &&
      privateBuyer.isVerified &&
      (!customVestingAddress || customVestingAddress === account),
    [privateBuyer, vestingStatus, customVestingAddress, account]
  )

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
          <>
            {isPrivateBuyer ? (
              <PrivateBuyer />
            ) : (
              <VestingWrapper>
                <VestingInfo state={vestingStatus} />
                <VestingTable vestingStatus={vestingStatus} />
              </VestingWrapper>
            )}
          </>
        )}
      </>
    </>
  )
}

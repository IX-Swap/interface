import React, { useEffect, useMemo } from 'react'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { useIsPrivateBuyer, useVestingState, useVestingStatus } from 'state/vesting/hooks'
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
  const { loadingVesting, privateBuyer, customVestingAddress } = useVestingState()
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
      <VestingWrapper>
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

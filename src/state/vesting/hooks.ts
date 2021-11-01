import { CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { BigNumber } from 'ethers'
import { useVestingContract } from 'hooks/useContract'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { VestingStatus } from 'pages/Farming/Vesting/Vesting'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { vesting } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { useTransactionAdder } from 'state/transactions/hooks'
import { setTransaction } from 'state/withdraw/actions'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { hexToRGBA } from 'utils/themeHelper'
import {
  claimAll,
  getDetails,
  getIsPrivateBuyer,
  persistIsVesting,
  saveAvailableClaim,
  saveIsVesting,
  savePayouts,
  saveVestingStatus,
} from './actions'
import { vestingResponseAdapter } from './utils'

export enum STATUS {
  SUCCESS,
  FAILED,
}

export function useDistributeCallback(): () => Promise<void> {
  const vesting = useVestingContract()

  const currency = useIXSCurrency()
  const decimals = currency?.decimals
  return useCallback(async () => {
    try {
      // await tokenContract?.transfer(
      //   '0x91112a4B1A0c7f5eE34Cc4d812fd51f9011fD7F5',
      //   BigNumber.from(50).mul(BigNumber.from(10).pow(decimals ?? 1))
      // )
      const success = await vesting?.distribute(
        // '0x2966adb1F526069cACac849FDd00C41334652238',
        '0x84076ad7edbaF2c12882C5C7F56cb39Ed2D505DF',
        BigNumber.from(604800),
        BigNumber.from(50).mul(BigNumber.from(10).pow(decimals ?? 1)),
        BigNumber.from(3 * 60 * 60),
        { gasLimit: 9999999 }
      )
      console.log({ success })
    } catch (error) {
      console.error(`Could not distribute`, error)
    }
  }, [vesting, decimals])
}

export function useIsVestingCallback(): (address?: string) => Promise<boolean> {
  const vesting = useVestingContract()
  const { account } = useActiveWeb3React()
  return useCallback(
    async (address?: string) => {
      try {
        const accountToCheck = address || account
        if (!accountToCheck) {
          return false
        }
        const isVesting = await vesting?.isVesting(accountToCheck)
        return Boolean(isVesting)
      } catch (error) {
        console.error(`Could not get isVesting`, error)
        return false
      }
    },
    [vesting, account]
  )
}

export function useAvailableClaim() {
  const vesting = useVestingContract()
  const dispatch = useDispatch<AppDispatch>()
  const fetchClaimable = useCallback(
    async (address?: string | null) => {
      try {
        if (!address) {
          return
        }
        dispatch(saveAvailableClaim.pending())
        const claimable = await vesting?.availableClaim(address)
        dispatch(saveAvailableClaim.fulfilled({ availableClaim: claimable.toString() }))
      } catch (error) {
        console.error(`Could not get claimable`, error)
        dispatch(saveAvailableClaim.rejected({ errorMessage: 'Could not get claimable' }))
      }
    },
    [vesting, dispatch]
  )
  return { fetchClaimable }
}

export function usePayouts() {
  const vesting = useVestingContract()
  const dispatch = useDispatch<AppDispatch>()

  const fetchPayouts = useCallback(
    async (address?: string | null) => {
      try {
        if (!address) {
          dispatch(savePayouts.pending())
        }
        const result = await vesting?.payouts(address)

        const payouts = result.map((payout: [BigNumber, BigNumber]) => [payout[0].toNumber(), payout[1].toString()])
        dispatch(savePayouts.fulfilled({ payouts }))
        return payouts
      } catch (error) {
        dispatch(savePayouts.rejected({ errorMessage: 'Could not get payouts' }))
        console.error(`Could not get payouts`, error)
      }
    },
    [dispatch, vesting]
  )

  return { fetchPayouts }
}

export function useClaimAll(): () => Promise<any> {
  const vesting = useVestingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const addTransaction = useTransactionAdder()
  const currency = useIXSCurrency()
  const { fetchDetails } = useVestingDetails()
  const { fetchClaimable } = useAvailableClaim()
  const { fetchPayouts } = usePayouts()
  const { getVesting } = useVestingStatus()
  const address = account

  return useCallback(async () => {
    try {
      if (!address) {
        return false
      }
      dispatch(claimAll.pending())
      const claimable = await vesting?.availableClaim(address)
      const claimed = await vesting?.claimFor(address, claimable)

      if (currency) {
        addTransaction(claimed, {
          summary: t`Claimed ${formatCurrencyAmount(
            CurrencyAmount.fromRawAmount(currency, claimable),
            currency?.decimals ?? 18
          )} ${currency?.symbol}`,
        })
      }

      dispatch(setTransaction({ tx: claimed.hash ?? claimed.tx }))
      await claimed.wait()
      dispatch(claimAll.fulfilled())
      const { vestingStatus, isVesting } = await getVesting(address)
      if (isVesting && vestingStatus === VestingStatus.VALID) {
        await fetchDetails(address)
        await fetchPayouts(address)
        await fetchClaimable(address)
      }
      return Boolean(claimed)
    } catch (error) {
      console.error(`Could not claim all `, error)
      dispatch(claimAll.rejected())
      return false
    }
  }, [vesting, address, addTransaction, currency, fetchDetails, fetchClaimable, fetchPayouts, getVesting])
}

export function useVestingStatus() {
  const getIsVesting = useIsVestingCallback()
  const dispatch = useDispatch<AppDispatch>()

  const getVesting = useCallback(
    async (address?: string) => {
      try {
        dispatch(saveIsVesting.pending())
        const vestingResponse = await getIsVesting(address)
        const vestingStatus = vestingResponse ? VestingStatus.VALID : VestingStatus.ZERO_BALANCE
        dispatch(saveVestingStatus(vestingStatus))
        dispatch(saveIsVesting.fulfilled({ isVesting: vestingResponse }))
        return { vestingStatus, isVesting: vestingResponse }
      } catch (error) {
        dispatch(saveIsVesting.rejected({ errorMessage: '`Could not get vesting status' }))
        return { vestingStatus: VestingStatus.ZERO_BALANCE, isVesting: false }
      }
    },
    [getIsVesting]
  )

  return { getVesting }
}

export function useVestingDetails() {
  const vesting = useVestingContract()
  const dispatch = useDispatch<AppDispatch>()
  const fetchDetails = useCallback(
    async (address?: string | null) => {
      try {
        dispatch(getDetails.pending())
        const vestingDetails = await vesting?.details(address)
        dispatch(getDetails.fulfilled({ details: vestingResponseAdapter(vestingDetails) }))
      } catch (error) {
        console.error(`Could not get vesting details`, error)
        dispatch(getDetails.rejected({ errorMessage: error.message }))
      }
    },
    [vesting]
  )

  return { fetchDetails }
}

export function useTableOptions() {
  const theme = useTheme()
  return useMemo(() => {
    const options = {
      maintainAspectRatio: false,
      elements: {
        line: {
          borderJoinStyle: 'round',
        },
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        decimation: {
          enabled: true,
          algorithm: 'lttb',
          samples: 10,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: hexToRGBA(theme.text2, 0.5),
            maxTicksLimit: 10,
          },
        },
        y: {
          grid: {
            color: hexToRGBA(theme.text2, 0.2),
            borderWidth: 0,
            borderDash: [3, 3],
          },
          ticks: {
            color: theme.text2,

            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '21px',
          },
        },
      },
    }
    return options
  }, [theme])
}

export const privateBuyer = async (address: string) => {
  const result = await apiService.post(vesting.privateBuyer, { address })
  return result.data
}

export function useIsPrivateBuyer() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(
    async (address: string) => {
      try {
        dispatch(getIsPrivateBuyer.pending())
        const data = await privateBuyer(address)
        dispatch(getIsPrivateBuyer.fulfilled({ data }))
        return STATUS.SUCCESS
      } catch (error: any) {
        dispatch(getIsPrivateBuyer.rejected({ errorMessage: 'Could not get private buyers' }))
        return STATUS.FAILED
      }
    },
    [dispatch]
  )
  return callback
}

export function useVestingState(): AppState['vesting'] {
  const data = useSelector<AppState, AppState['vesting']>((state) => state.vesting)
  return {
    ...data,
    loadingVesting:
      data.loadingIsVesting ||
      data.loadingDetails ||
      data.loadingAvailableClaim ||
      data.loadingPayouts ||
      data.loadingVesting ||
      data.loadingClaimAll,
  }
}

export function useUpdateVestingState() {
  const { account } = useActiveWeb3React()
  const { customVestingAddress } = useVestingState()
  const dispatch = useDispatch<AppDispatch>()
  const { getVesting } = useVestingStatus()
  const { fetchDetails } = useVestingDetails()
  const { fetchPayouts } = usePayouts()
  const { fetchClaimable } = useAvailableClaim()
  useEffect(() => {
    async function refreshVesting() {
      const usedAccount = customVestingAddress || account
      if (!usedAccount) {
        dispatch(saveVestingStatus(VestingStatus.CONNECT_WALLET))
        dispatch(persistIsVesting({ isVesting: false }))
        return
      }
      const { vestingStatus, isVesting } = await getVesting(usedAccount)
      if (isVesting && vestingStatus === VestingStatus.VALID) {
        fetchDetails(usedAccount)
        fetchPayouts(usedAccount)
        fetchClaimable(usedAccount)
      }
    }
    refreshVesting()
  }, [account, getVesting, customVestingAddress, fetchClaimable, fetchDetails, fetchPayouts])
}

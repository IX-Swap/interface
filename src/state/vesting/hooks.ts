import { CurrencyAmount } from '@ixswap1/sdk-core'
import { t } from '@lingui/macro'
import { IXS_ADDRESS } from 'constants/addresses'
import { BigNumber } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { useVestingContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { VestingState } from 'pages/Farming/Vesting'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useUserAccountState } from 'state/user/hooks'
import { setTransaction } from 'state/withdraw/actions'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { hexToRGBA } from 'utils/themeHelper'
import { getDetails, saveAvailableClaim, saveIsVesting, savePayouts } from './actions'
import { vestingResponseAdapter } from './utils'

export function useDistributeCallback(): () => Promise<void> {
  const vesting = useVestingContract()
  const { chainId } = useActiveWeb3React()

  const currency = useCurrency(IXS_ADDRESS[chainId ?? 42])
  const decimals = currency?.decimals
  return useCallback(async () => {
    try {
      const success = await vesting?.distribute(
        '0x78140B507Ca3CCA6A2174d8eb5A642F36EBc4051',
        BigNumber.from(604800),
        BigNumber.from(100).mul(BigNumber.from(10).pow(decimals ?? 1)),
        BigNumber.from(3 * 60 * 60)
      )
      console.log({ success })
    } catch (error) {
      console.error(`Could not distribute`, error)
    }
  }, [vesting, decimals])
}

export function useIsVestingCallback(): () => Promise<boolean> {
  const vesting = useVestingContract()
  const savedAccount = useUserAccountState()
  return useCallback(async () => {
    try {
      if (!savedAccount) {
        return false
      }
      const isVesting = await vesting?.isVesting(savedAccount)
      return Boolean(isVesting)
    } catch (error) {
      console.error(`Could not get isVesting`, error)
      return false
    }
  }, [vesting, savedAccount])
}

export function useAvailableClaim() {
  const vesting = useVestingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const { isVesting, availableClaim } = useVestingState()
  const fetchClaimable = useCallback(async () => {
    try {
      if (!account) {
        return
      }
      const claimable = await vesting?.availableClaim(account)
      dispatch(saveAvailableClaim({ availableClaim: claimable.toString() }))
    } catch (error) {
      console.error(`Could not get claimable`, error)
    }
  }, [vesting, account, dispatch])

  useEffect(() => {
    if (isVesting && account) {
      fetchClaimable()
    }
  }, [fetchClaimable, account, isVesting])
  return availableClaim
}

export function usePayouts() {
  const vesting = useVestingContract()
  const account = useUserAccountState()
  const dispatch = useDispatch<AppDispatch>()

  const { isVesting, payouts } = useVestingState()
  const fetchPayouts = useCallback(async () => {
    try {
      if (!account) {
        dispatch(savePayouts({ payouts: [] }))
      }
      const result = await vesting?.payouts(account)

      const payouts = result.map((payout: [BigNumber, BigNumber]) => [payout[0].toNumber(), payout[1].toString()])
      dispatch(savePayouts({ payouts }))
      return payouts
    } catch (error) {
      dispatch(savePayouts({ payouts: [] }))
      console.error(`Could not get payouts`, error)
    }
  }, [account, dispatch, vesting])
  useEffect(() => {
    if (isVesting && account) {
      fetchPayouts()
    }
  }, [fetchPayouts, account, isVesting])
  return payouts
}

export function useClaimAll(): () => Promise<any> {
  const vesting = useVestingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const addTransaction = useTransactionAdder()
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  return useCallback(async () => {
    try {
      if (!account) {
        return false
      }
      const claimable = await vesting?.availableClaim(account)
      const claimed = await vesting?.claimFor(account, claimable)
      const vestingDetails = await vesting?.details(account)

      const result = await vesting?.payouts(account)
      const payouts = result.map((payout: [BigNumber, BigNumber]) => [payout[0].toNumber(), payout[1].toString()])
      dispatch(getDetails.fulfilled({ details: vestingResponseAdapter(vestingDetails) }))
      dispatch(saveAvailableClaim({ availableClaim: claimable.toString() }))
      dispatch(savePayouts({ payouts }))
      if (currency) {
        addTransaction(claimed, {
          summary: t`Released ${formatCurrencyAmount(
            CurrencyAmount.fromRawAmount(currency, claimable),
            currency?.decimals ?? 18
          )} IXS`,
        })
      }

      dispatch(setTransaction({ tx: claimed.hash ?? claimed.tx }))
      return Boolean(claimed)
    } catch (error) {
      console.error(`Could not claim`, error)
      return false
    }
  }, [vesting, account, dispatch, addTransaction, currency])
}

export function useVestingStatus() {
  const [vestingStatus, setVestingStatus] = useState(VestingState.LOADING)
  const { account } = useActiveWeb3React()
  const getIsVesting = useIsVestingCallback()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!account && vestingStatus !== VestingState.CONNECT_WALLET) {
      setVestingStatus(VestingState.CONNECT_WALLET)
    }
    if (account) {
      getVesting()
    }
    async function getVesting() {
      const vestingResponse = await getIsVesting()
      setVestingStatus(vestingResponse ? VestingState.VALID : VestingState.ZERO_BALANCE)
      dispatch(saveIsVesting({ isVesting: vestingResponse }))
    }
  }, [account, vestingStatus, getIsVesting, dispatch])
  return vestingStatus
}

export function useVestingDetails() {
  const vesting = useVestingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const { isVesting, details } = useVestingState()
  const fetchDetails = useCallback(async () => {
    try {
      dispatch(getDetails.pending())
      const vestingDetails = await vesting?.details(account)
      dispatch(getDetails.fulfilled({ details: vestingResponseAdapter(vestingDetails) }))
    } catch (error) {
      console.error(`Could not get vesting details`, error)
      dispatch(getDetails.rejected({ errorMessage: error.message }))
    }
  }, [vesting, account, dispatch])

  useEffect(() => {
    if (isVesting && account && !details) {
      fetchDetails()
    }
  }, [fetchDetails, account, isVesting, details])
  return details
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

export function useVestingState(): AppState['vesting'] {
  return useSelector<AppState, AppState['vesting']>((state) => state.vesting)
}

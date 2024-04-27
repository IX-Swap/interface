import { useState, useEffect } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { Currency, CurrencyAmount, Percent, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { useCallback, useMemo } from 'react'
import { SWAP_ROUTER_ADDRESS } from '../constants/addresses'
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils/calculateGasMargin'
import { useTokenContract } from './useContract'
import { useTokenAllowance } from './useTokenAllowance'
import { useActiveWeb3React } from './web3'
import { useWeb3React } from '@web3-react/core'
import { ethers, BigNumber } from 'ethers'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export function useOptimizedApproveCallback(
  tokenAddress?: string,
  amountToApprove?: BigNumber,
  spender?: string
): [ApprovalState, () => Promise<void>, () => void] {
  const { account } = useWeb3React()
  const tokenContract = useTokenContract(tokenAddress || '')
  const [currentAllowance, setCurrentAllowance] = useState<any>(ethers.constants.Zero)
  const [shouldRefereshAllowance, setShouldRefereshAllowance] = useState<boolean>(false)
  const [approving, setApproving] = useState<boolean>(false)

  const refreshAllowance = useCallback(() => {
    setShouldRefereshAllowance((prev) => !prev)
  }, [setShouldRefereshAllowance])

  useEffect(() => {
    if (!tokenContract || !account || !spender) return
    const fetchAllowance = async () => {
      const allowance = await tokenContract.allowance(account, spender)
      console.info('Refresh allowance: ', ethers.utils.formatUnits(allowance, 6))
      setCurrentAllowance(allowance)
      setApproving(false) // reset approving state
    }
    fetchAllowance()
  }, [tokenContract, account, spender, shouldRefereshAllowance])

  // const pendingApproval = useHasPendingApproval(tokenAddress, spender)
  // // check the current approval status

  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender || !currentAllowance) return ApprovalState.UNKNOWN
    if (approving) return ApprovalState.PENDING
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(amountToApprove) ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, spender])

  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    const estimatedGas = await tokenContract.estimateGas.approve(spender, amountToApprove)
    setApproving(true)
    return tokenContract
      .approve(spender, amountToApprove, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve token spending',
          approval: { tokenAddress: tokenAddress || '', spender: spender },
        })
        return response.wait()
      })
      .then((receipt: TransactionReceipt) => {
        console.log('Transaction confirmed:', receipt)
        refreshAllowance()
      })
      .catch((error: Error) => {
        throw error
      })
  }, [approvalState, tokenContract, amountToApprove, spender, addTransaction])

  // return [approvalState, approve]
  return [approvalState, approve, refreshAllowance]
}

// DEPRECATED: useApproveCallback use multicalls that result in extremely slow performance please use useOptimizedApproveCallback hook instead,
// usage: returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React()
  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)
  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString())
    })

    return tokenContract
      .approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender: spender },
        })
        return response.wait()
      })
      .then((receipt: TransactionReceipt) => {
        console.log('Transaction confirmed:', receipt)
      })
      .catch((error: Error) => {
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  trade: V2Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: Percent
) {
  const { chainId } = useActiveWeb3React()
  const amountToApprove = useMemo(
    () => (trade && trade.inputAmount.currency?.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined),
    [trade, allowedSlippage]
  )
  return useApproveCallback(
    amountToApprove,
    chainId ? (trade instanceof V2Trade ? SWAP_ROUTER_ADDRESS[chainId] : undefined) : undefined
  )
}

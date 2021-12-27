import { Currency, CurrencyAmount, Percent, Token, TradeType } from '@ixswap1/sdk-core'
import { Trade as V2Trade } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import * as H from 'history'
import { useMissingAuthorizations } from 'hooks/useSwapCallback'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthorizationsState, useSetSwapState } from 'state/swapHelper/hooks'
import { useUserSecTokens, useUserSingleHopOnly } from 'state/user/hooks'
import { useAllTokens, useCurrency } from '../../hooks/Tokens'
import useENS from '../../hooks/useENS'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import useSwapSlippageTolerance from '../../hooks/useSwapSlippageTolerance'
import { useV2TradeExactIn, useV2TradeExactOut } from '../../hooks/useV2Trade'
import { useActiveWeb3React } from '../../hooks/web3'
import { isAddress } from '../../utils'
import { AppDispatch, AppState } from '../index'
import { useCurrencyBalances } from '../wallet/hooks'
import {
  Field,
  replaceSwapState,
  selectCurrency,
  setApprovalSubmitted,
  setRecipient,
  switchCurrencies,
  typeInput,
} from './actions'
import { BAD_RECIPIENT_ADDRESSES } from './constants'
import { involvesAddress, queryParametersToSwapState, tryParseAmount } from './helpers'

export function useSwapState(): AppState['swap'] {
  return useSelector<AppState, AppState['swap']>((state) => state.swap)
}

export function useSubmitApproval() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (approval: boolean) => {
      dispatch(setApprovalSubmitted({ approvalSubmitted: approval }))
    },
    [dispatch]
  )
}

export function useSwapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void
  onSwitchTokens: () => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      dispatch(
        selectCurrency({
          field,
          currencyId: currency.isToken ? currency.address : currency.isNative ? 'ETH' : '',
        })
      )
    },
    [dispatch]
  )

  const onSwitchTokens = useCallback(() => {
    dispatch(switchCurrencies())
  }, [dispatch])

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch]
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch]
  )

  return {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
  }
}

// from the current swap inputs, compute the best trade and return it.
export function useDerivedSwapInfo(): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  v2Trade: V2Trade<Currency, Currency, TradeType> | undefined
  toggledTrade: V2Trade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  shouldGetAuthorization: boolean
} {
  const { account } = useActiveWeb3React()

  const [singleHopOnly] = useUserSingleHopOnly()
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState()
  const { swapErrorMessage } = useSetSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])

  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)

  const bestV2TradeExactIn = useV2TradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })
  const bestV2TradeExactOut = useV2TradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })

  const v2Trade = isExactIn ? bestV2TradeExactIn : bestV2TradeExactOut

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = t`Connect Wallet`
  }

  if (!parsedAmount) {
    inputError = inputError ?? t`Enter an amount`
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? t`Choose token`
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? t`Enter a recipient`
  } else {
    if (
      BAD_RECIPIENT_ADDRESSES[formattedTo] ||
      (bestV2TradeExactIn && involvesAddress(bestV2TradeExactIn, formattedTo)) ||
      (bestV2TradeExactOut && involvesAddress(bestV2TradeExactOut, formattedTo))
    ) {
      inputError = inputError ?? t`Invalid recipient`
    }
  }

  const toggledTrade = v2Trade ?? undefined
  const allowedSlippage = useSwapSlippageTolerance(toggledTrade)

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], v2Trade?.maximumAmountIn(allowedSlippage)]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = t`Insufficient ${amountIn.currency.symbol} balance`
  }

  const missingAuthorizations = useMissingAuthorizations(v2Trade)
  const shouldGetAuthorization = missingAuthorizations.length > 0
  if (shouldGetAuthorization && !inputError) {
    if (swapErrorMessage) {
      inputError = swapErrorMessage
    } else {
      inputError = t`Authorization missing`
    }
  }
  return {
    currencies,
    currencyBalances,
    parsedAmount,
    inputError,
    v2Trade: v2Trade ?? undefined,
    toggledTrade,
    allowedSlippage,
    shouldGetAuthorization,
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch():
  | { inputCurrencyId: string | undefined; outputCurrencyId: string | undefined }
  | undefined {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const authorizations = useAuthorizationsState()
  const noAuthorizations = !authorizations || Object.keys(authorizations).length === 0
  const [result, setResult] =
    useState<{ inputCurrencyId: string | undefined; outputCurrencyId: string | undefined } | undefined>()
  const state = useSwapState()
  useEffect(() => {
    if (!chainId) return
    const parsed = queryParametersToSwapState(parsedQs)
    const parsedInputCurrency = parsed[Field.INPUT].currencyId
    const parsedOutputCurrency = parsed[Field.OUTPUT].currencyId
    if (!parsedInputCurrency && !parsedOutputCurrency) {
      return
    }
    dispatch(
      replaceSwapState({
        typedValue: parsed.typedValue ? parsed.typedValue : state.typedValue,
        field: parsed.independentField ? parsed.independentField : state.independentField,
        inputCurrencyId: parsedInputCurrency || state[Field.INPUT].currencyId,
        outputCurrencyId: parsedOutputCurrency || state[Field.OUTPUT].currencyId,
        recipient: parsed.recipient ? parsed.recipient : state.recipient,
      })
    )

    setResult({
      inputCurrencyId: state[Field.INPUT].currencyId || parsed[Field.INPUT].currencyId,
      outputCurrencyId: state[Field.OUTPUT].currencyId || parsed[Field.OUTPUT].currencyId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId])

  return result
}

export const useImportNonDefaultTokens = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const { secTokens } = useUserSecTokens()
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const allTokens = { ...defaultTokens, ...secTokens }
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in allTokens)
    })

  return { importTokensNotInDefault }
}

export const useDismissTokenWarning = (history: H.History) => {
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])
  // reset if they close warning without tokens in params
  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    history.push('/swap/')
  }, [history])
  return { dismissTokenWarning, handleDismissTokenWarning, handleConfirmTokenWarning }
}

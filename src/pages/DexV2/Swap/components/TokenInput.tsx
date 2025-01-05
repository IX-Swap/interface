import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import _get from 'lodash/get'

import TokenSelectInput from '../../common/TokenSelectInput'
import { ReactComponent as WalletIcon } from 'assets/images/dex-v2/wallet.svg'
import { useTokens } from 'state/dexV2/tokens/hooks/useTokens'
import useNumbers from 'hooks/dex-v2/useNumbers'
import { bnum, isSameAddress } from 'lib/utils'
import { TokenInfo } from 'types/TokenList'
import { useAccount } from 'wagmi'
import { isLessThanOrEqualTo, isPositive } from 'lib/utils/validations'
import { Rules } from 'pages/DexV2/types'
import { overflowProtected } from 'pages/DexV2/Pool/components/helpers'

type InputValue = string | number

type Props = {
  name: string
  amount: InputValue
  address?: string
  weight?: number | string
  noRules?: boolean
  noMax?: boolean
  priceImpact?: number
  label?: string
  fixedToken?: boolean
  customBalance?: string
  balanceLabel?: string
  disableMax?: boolean
  disableBalance?: boolean
  balanceLoading?: boolean
  hint?: string
  hintAmount?: string
  excludedTokens?: string[]
  options?: string[]
  rules?: Rules
  autoFocus?: boolean
  disableNativeAssetBuffer?: boolean
  hideFooter?: boolean
  hideFiatValue?: boolean
  ignoreWalletBalance?: boolean
  tokenValue?: string
  placeholder?: string
  // tokenSelectProps?: Partial<TokenSelectProps>
  slider?: boolean
  // sliderProps?: Partial<BalRangeInputProps>
  updateAmount: (amount: string) => void
  updateAddress: (address: string) => void
  setMax?: () => void
}

const defaultProps: Props = {
  name: '',
  amount: '',
  address: '',
  weight: 0,
  noRules: false,
  noMax: false,
  fixedToken: false,
  disableMax: false,
  disableBalance: false,
  balanceLoading: false,
  hintAmount: '',
  disableNativeAssetBuffer: false,
  hideFooter: false,
  hideFiatValue: false,
  ignoreWalletBalance: false,
  // options: () => [],
  rules: [],
  priceImpact: 0,
  label: '',
  customBalance: '',
  balanceLabel: '',
  hint: '',
  excludedTokens: [],
  placeholder: '',
  // tokenSelectProps: () => ({}),
  slider: false,
  // sliderProps: () => ({}),
  updateAmount: () => {},
  updateAddress: () => {},
  setMax: () => {},
}

const TokenInput: React.FC<Props> = (props = defaultProps) => {
  const { name, amount, address, customBalance, excludedTokens, autoFocus, disableNativeAssetBuffer } = props
  const [_address, setAddress] = useState<any>('')
  const [_amount, setAmount] = useState<string>('')

  const { address: account } = useAccount()
  const isWalletReady = useMemo(() => account !== null, [account])
  const { fNum, toFiat } = useNumbers()
  const { getToken, balanceFor, nativeAsset, getMaxBalanceFor } = useTokens()

  /**
   * COMPUTED
   */
  const tokenBalance = useMemo(() => {
    if (customBalance) return customBalance
    return balanceFor(_address)
  }, [_address, customBalance])
  const hasToken = !!_address
  const amountBN = bnum(_amount)
  const tokenBalanceBN = bnum(tokenBalance)
  const hasAmount = amountBN.gt(0)
  const hasBalance = tokenBalanceBN.gt(0)
  const shouldUseTxBuffer = _address === nativeAsset.address && !disableNativeAssetBuffer
  const amountExceedsTokenBalance = amountBN.gt(tokenBalance)
  const shouldShowTxBufferMessage = useMemo(() => {
    if (amountExceedsTokenBalance || !shouldUseTxBuffer || !hasBalance || !hasAmount) {
      return false
    }

    return amountBN.gte(tokenBalanceBN.minus(nativeAsset.minTransactionBuffer))
  }, [amountExceedsTokenBalance, shouldUseTxBuffer, hasBalance, hasAmount])

  const isMaxed = useMemo(() => {
    if (shouldUseTxBuffer) {
      return _amount === tokenBalanceBN.minus(nativeAsset.minTransactionBuffer).toString()
    } else {
      return _amount === tokenBalance
    }
  }, [_amount, tokenBalance, shouldUseTxBuffer])

  const token = useMemo((): TokenInfo | undefined => {
    if (!hasToken) return undefined
    return getToken(_address)
  }, [_address, hasToken])

  const tokenValue = props.tokenValue ?? toFiat(amount, _address)

  const inputRules = useMemo(() => {
    if (!hasToken || !isWalletReady || props.noRules) {
      return [isPositive()]
    }

    const rules = props.rules ? [...props.rules, isPositive()] : [isPositive()]
    if (!props.ignoreWalletBalance) {
      rules.push(isLessThanOrEqualTo(tokenBalance, 'exceedsBalance'))
    }
    return rules
  }, [hasToken, isWalletReady, props.noRules, props.rules, props.ignoreWalletBalance, tokenBalance])

  const maxPercentage = useMemo(() => {
    if (!hasBalance || !hasAmount) return '0'

    return amountBN.div(tokenBalance).times(100).toFixed(2)
  }, [hasBalance, hasAmount, amountBN, tokenBalance])

  const bufferPercentage = useMemo(() => {
    if (!shouldShowTxBufferMessage) return '0'

    return bnum(nativeAsset.minTransactionBuffer).div(tokenBalance).times(100).toFixed(2)
  }, [shouldShowTxBufferMessage, tokenBalance])

  const barColor = amountExceedsTokenBalance ? 'red' : 'green'

  const priceImpactSign = _get(props, 'priceImpact', 0) >= 0 ? '-' : '+'

  const priceImpactClass = _get(props, 'priceImpact', 0) >= 0.01 ? 'text-red-500' : ''

  const decimalLimit = token?.decimals || 18

  const updateAddress = (address: string) => {
    setAddress(address)
  }

  function handleAmountChange(amount: InputValue) {
    const safeAmount = overflowProtected(amount, decimalLimit)

    props.updateAmount(safeAmount)
  }

  const setMax = () => {
    if (props.disableMax) return

    const maxAmount = props.customBalance
      ? props.customBalance
      : getMaxBalanceFor(_address.value, props.disableNativeAssetBuffer)

    // emit('setMax', maxAmount)
    handleAmountChange(maxAmount)
  }

  useEffect(() => {
    setAmount(amount.toString())
  }, [amount])

  useEffect(() => {
    setAddress(address)
  }, [address])

  return (
    <Container>
      <Flex justifyContent="space-between" alignItems="center">
        <StyledInput
          placeholder="0.00"
          min="0"
          step="0.01"
          onKeyDown={() => {}}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={''}
          name={name}
          autoFocus={autoFocus}
          onChange={(e) => {}}
        />

        <TokenSelectInput modelValue={_address} excludedTokens={excludedTokens} updateAddress={updateAddress} />
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <StyledNumber>$0.00</StyledNumber>
        <Flex alignItems="center" style={{ gap: 8 }}>
          <StyledNumber>346.93</StyledNumber>
          <WalletIcon />
        </Flex>
      </Flex>
    </Container>
  )
}

export default TokenInput

const Container = styled.div`
  border-radius: 8px;
  background: #f7f7fa;
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 8px;
`

const StyledInput = styled.input`
  color: rgba(41, 41, 51, 0.9);
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.84px;
  text-align: left;
  outline: none;
  border: none;
  background: transparent;
  min-width: 50px;
  max-width: 185px;
`

const StyledNumber = styled.div`
  color: #b8b8d2;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.42px;
`

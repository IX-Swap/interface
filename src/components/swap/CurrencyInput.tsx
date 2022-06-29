import React, { useCallback } from 'react'
import { Trans } from '@lingui/macro'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

import { useUSDCValue } from 'hooks/useUSDCPrice'
import { useSubmitApproval, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { computeFiatValuePriceImpact } from 'utils/computeFiatValuePriceImpact'
import useTheme from 'hooks/useTheme'

import { ReactComponent as ArrowDown } from '../../assets/images/arrow.svg'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { ArrowWrapper } from '../../components/swap/styleds'
import { Field } from '../../state/swap/actions'

interface ParsedAmounts {
  INPUT: CurrencyAmount<Currency> | undefined
  OUTPUT: CurrencyAmount<Currency> | undefined
}
interface Currencies {
  INPUT?: Currency
  OUTPUT?: Currency
}
interface Props {
  parsedAmounts: ParsedAmounts
  maxInputAmount?: CurrencyAmount<Currency>
  showWrap: boolean
  currencies: Currencies
  handleHideConfirm: () => void
}

export const CurrencyInput = ({ parsedAmounts, maxInputAmount, showWrap, currencies, handleHideConfirm }: Props) => {
  const theme = useTheme()
  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const { independentField, typedValue } = useSwapState()
  const setApprovalSubmitted = useSubmitApproval()

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
      handleHideConfirm()
    },
    [onUserInput, handleHideConfirm]
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
      handleHideConfirm()
    },
    [onUserInput, handleHideConfirm]
  )
  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      handleHideConfirm()
    },
    [onCurrencySelection, setApprovalSubmitted, handleHideConfirm]
  )

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      handleHideConfirm()
    },
    [onCurrencySelection, handleHideConfirm]
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
    handleHideConfirm()
  }, [maxInputAmount, onUserInput, handleHideConfirm])

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  return (
    <div style={{ display: 'relative' }}>
      <CurrencyInputPanel
        label={independentField === Field.OUTPUT && !showWrap ? <Trans>From (at most)</Trans> : <Trans>From</Trans>}
        value={formattedAmounts[Field.INPUT]}
        showMaxButton={showMaxButton}
        currency={currencies[Field.INPUT]}
        onUserInput={handleTypeInput}
        onMax={handleMaxInput}
        fiatValue={fiatValueInput ?? undefined}
        onCurrencySelect={handleInputSelect}
        otherCurrency={currencies[Field.OUTPUT]}
        showCommonBases={true}
        title={<Trans>Select a token to swap</Trans>}
        id="swap-currency-input"
      />
      <ArrowWrapper
        data-testid="currencyReplace"
        clickable
        onClick={() => {
          setApprovalSubmitted(false) // reset 2 step UI for approvals
          onSwitchTokens()
        }}
      >
        <ArrowDown
          width="16px"
          height="16px"
          color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.text1 : theme.text3}
          fill={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.text1 : theme.text3}
        />
      </ArrowWrapper>
      <CurrencyInputPanel
        value={formattedAmounts[Field.OUTPUT]}
        onUserInput={handleTypeOutput}
        label={independentField === Field.INPUT && !showWrap ? <Trans>To (at least)</Trans> : <Trans>To</Trans>}
        showMaxButton={false}
        hideBalance={false}
        fiatValue={fiatValueOutput ?? undefined}
        priceImpact={priceImpact}
        currency={currencies[Field.OUTPUT]}
        onCurrencySelect={handleOutputSelect}
        otherCurrency={currencies[Field.INPUT]}
        showCommonBases={true}
        id="swap-currency-output"
      />
    </div>
  )
}

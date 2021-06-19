import React from 'react'
import { Percent } from '@ixswap1/sdk-core'
import { ArrowDown, Plus } from 'react-feather'
import { ColumnCenter } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'

import { useCurrency } from '../../hooks/Tokens'
import { useDerivedBurnInfo } from '../../state/burn/hooks'
import { Field } from '../../state/burn/actions'
import useSelectCurrency from './useSelectCurrency'
import useTheme from 'hooks/useTheme'
import * as H from 'history'
import useCurrencyInput from './useCurrencyInput'
import { FormattedAmounts } from './interfaces'

interface Props {
  formattedAmounts: FormattedAmounts
  history: H.History
  currencyIdA?: string
  currencyIdB?: string
}

/* <DetailedRemove
  formattedAmounts={formattedAmounts}
  history={history}
  currencyIdA={currencyIdA}
  currencyIdB={currencyIdB}
/> */

export const DetailedRemove = ({ formattedAmounts, history, currencyIdA, currencyIdB }: Props) => {
  const { handleSelectCurrencyA, handleSelectCurrencyB } = useSelectCurrency({ history, currencyIdA, currencyIdB })
  const theme = useTheme()
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { pair, parsedAmounts } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))
  const { onUserInput, onLiquidityInput, onCurrencyAInput, onCurrencyBInput } = useCurrencyInput()

  return (
    <>
      <CurrencyInputPanel
        value={formattedAmounts[Field.LIQUIDITY]}
        onUserInput={onLiquidityInput}
        onMax={() => {
          onUserInput(Field.LIQUIDITY_PERCENT, '100')
        }}
        showMaxButton={!atMaxAmount}
        currency={pair?.liquidityToken}
        pair={pair}
        id="liquidity-amount"
      />
      <ColumnCenter>
        <ArrowDown size="16" color={theme.text2} />
      </ColumnCenter>
      <CurrencyInputPanel
        hideBalance={true}
        value={formattedAmounts[Field.CURRENCY_A]}
        onUserInput={onCurrencyAInput}
        onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
        showMaxButton={!atMaxAmount}
        currency={currencyA}
        label={'Output'}
        onCurrencySelect={handleSelectCurrencyA}
        id="remove-liquidity-tokena"
      />
      <ColumnCenter>
        <Plus size="16" color={theme.text2} />
      </ColumnCenter>
      <CurrencyInputPanel
        hideBalance={true}
        value={formattedAmounts[Field.CURRENCY_B]}
        onUserInput={onCurrencyBInput}
        onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
        showMaxButton={!atMaxAmount}
        currency={currencyB}
        label={'Output'}
        onCurrencySelect={handleSelectCurrencyB}
        id="remove-liquidity-tokenb"
      />
    </>
  )
}

import { Currency, CurrencyAmount, Fraction, Percent } from '@ixswap1/sdk-core'
import React from 'react'
import { ButtonIXSWide } from '../../components/Button'
import { Field } from '../../state/mint/actions'
import { Trans } from '@lingui/macro'
import { ModalBottomWrapper } from './styleds'
import { TextRow } from 'components/TextRow/TextRow'
import { AutoColumn } from 'components/Column'
import { formatAmount } from 'utils/formatCurrencyAmount'

export function ModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  return (
    <ModalBottomWrapper>
      <AutoColumn gap="8px">
        <TextRow
          textLeft={<Trans>{currencies[Field.CURRENCY_A]?.symbol} Deposited</Trans>}
          textRight={<>{formatAmount(+(parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) || 0))}</>}
          currency={currencies[Field.CURRENCY_A]}
        />
        <TextRow
          textLeft={<Trans>{currencies[Field.CURRENCY_B]?.symbol} Deposited</Trans>}
          textRight={<>{formatAmount(+(parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) || 0))}</>}
          currency={currencies[Field.CURRENCY_B]}
        />
        <TextRow
          textLeft={<Trans>Rates</Trans>}
          textRight={
            <>
              {' '}
              {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${formatAmount(+(price?.toSignificant(4) || 0))} ${
                currencies[Field.CURRENCY_B]?.symbol
              }`}
            </>
          }
          currency={currencies[Field.CURRENCY_B]}
        />
        <TextRow
          textLeft={<></>}
          textRight={
            <>
              {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${formatAmount(+(price?.invert().toSignificant(4) || 0))} ${
                currencies[Field.CURRENCY_A]?.symbol
              }`}
            </>
          }
          currency={currencies[Field.CURRENCY_B]}
        />
        <TextRow
          textLeft={<Trans>Share of Pool</Trans>}
          textRight={
            <Trans>{noLiquidity ? '100' : formatAmount(+(poolTokenPercentage?.toSignificant(4) || 0))}%</Trans>
          }
        />
      </AutoColumn>
      <ButtonIXSWide style={{ margin: '30px 0 0 0' }} onClick={onAdd} data-testid="create-or-supply">
        {noLiquidity ? <Trans>Create Pool & Supply</Trans> : <Trans>Confirm Supply</Trans>}
      </ButtonIXSWide>
    </ModalBottomWrapper>
  )
}

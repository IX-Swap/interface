import { Currency, CurrencyAmount, Percent } from '@ixswap1/sdk-core'
import React, { useMemo } from 'react'
import useTheme from '../../hooks/useTheme'
import { TYPE } from '../../theme'
import { warningSeverity } from '../../utils/prices'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

const WidthFit = styled.span`
  min-width: fit-content;
`
export function FiatValue({
  fiatValue,
  priceImpact,
}: {
  fiatValue: CurrencyAmount<Currency> | null | undefined
  priceImpact?: Percent
}) {
  const theme = useTheme()
  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact.lessThan('0')) return theme.green1
    const severity = warningSeverity(priceImpact)
    if (severity < 1) return theme.text4
    if (severity < 3) return theme.yellow1
    return theme.red1
  }, [priceImpact, theme.green1, theme.red1, theme.text4, theme.yellow1])

  return (
    <WidthFit>
      <TYPE.body fontSize={14} color={fiatValue ? theme.text2 : theme.text4}>
        {fiatValue ? <Trans>~$ {fiatValue?.toSignificant(6, { groupSeparator: ',' })}</Trans> : ''}
        {priceImpact ? (
          <span style={{ color: priceImpactColor }}>
            {' '}
            (<Trans>{priceImpact.multiply(-1).toSignificant(3)}%</Trans>)
          </span>
        ) : null}
      </TYPE.body>
    </WidthFit>
  )
}

import { Currency, CurrencyAmount, Percent } from '@ixswap1/sdk-core'
import { Option, OptionRow } from 'components/OptionButton'
import Row, { RowBetween, RowFixed } from 'components/Row'
import React, { useCallback } from 'react'
import { TYPE } from 'theme'
import { AvailableBalance, HighlightedInput, StakingInput } from './styled'
import JSBI from 'jsbi'
import { Trans } from '@lingui/macro'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
interface Props {
  fieldTitle: string
  maxAvailable?: CurrencyAmount<Currency>
  typedValue: string
  onUserInput: (value: string) => void
  error?: string
  currency?: Currency | null
  parsedAmount?: CurrencyAmount<Currency>
  infoText?: string
}
const PERCENTAGES = ['25', '50', '75', '100']

export const StakingInputPercentage = ({
  fieldTitle,
  maxAvailable,
  typedValue,
  onUserInput,
  error,
  currency,
  parsedAmount,
  infoText,
}: Props) => {
  const onPercentageInput = useCallback(
    (percentage: string) => {
      const fraction = new Percent(JSBI.BigInt(percentage), JSBI.BigInt(100))
      const result = maxAvailable?.multiply(fraction)
      onUserInput(result?.toSignificant(currency?.decimals ?? 18) ?? '0')
    },
    [maxAvailable, currency, onUserInput]
  )

  const isSelectedPercentage = useCallback(
    (percentage: string) => {
      const fraction = JSBI.divide(JSBI.BigInt(percentage), JSBI.BigInt(100))

      return Boolean(parsedAmount && maxAvailable && parsedAmount.equalTo(maxAvailable.multiply(fraction)))
    },
    [maxAvailable, parsedAmount]
  )

  return (
    <>
      <Row style={{ marginTop: '19px' }}>
        <TYPE.body1>{fieldTitle}</TYPE.body1>
      </Row>
      <HighlightedInput style={{ marginTop: '11px' }}>
        <RowBetween style={{ flexWrap: 'wrap' }}>
          <StakingInput
            placeholder={maxAvailable?.toSignificant(5)}
            value={typedValue}
            error={Boolean(error)}
            onUserInput={onUserInput}
            color={error ? 'red' : 'text1'}
          />
          <AvailableBalance>
            <RowFixed>
              <Trans>Available: {maxAvailable?.toSignificant(5)}</Trans>
              {infoText && (
                <MouseoverTooltip text={infoText} placement={'top-end'}>
                  <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '7px' }}>
                    <InfoIcon />
                  </IconWrapper>
                </MouseoverTooltip>
              )}
            </RowFixed>
          </AvailableBalance>
        </RowBetween>
      </HighlightedInput>
      <OptionRow style={{ marginTop: '36px', width: '100%', justifyContent: 'space-between' }}>
        {PERCENTAGES.map((percentage) => (
          <Option
            key={percentage}
            onClick={() => onPercentageInput(percentage)}
            active={isSelectedPercentage(percentage)}
            data-testid={'percentage_' + percentage}
          >
            {percentage !== '100' ? `${percentage}%` : <Trans>MAX</Trans>}
          </Option>
        ))}
      </OptionRow>
    </>
  )
}

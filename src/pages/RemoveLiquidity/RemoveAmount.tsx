import React, { useCallback } from 'react'
import { Box, Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import Row, { RowBetween } from '../../components/Row'
import Slider from '../../components/Slider'
import useDebouncedChangeHandler from '../../hooks/useDebouncedChangeHandler'
import { Field } from '../../state/burn/actions'
import { Trans } from '@lingui/macro'
import { FormattedAmounts, ParsedAmounts } from './interfaces'
import { RemoveAmountTitle } from './styled'
import { NewOption, Option, OptionRow } from 'components/OptionButton'
import { DarkCard, DarkCardNew } from 'components/Card'

interface Props {
  formattedAmounts: FormattedAmounts
  parsedAmounts: ParsedAmounts
  onUserInput: (field: Field, typedValue: string) => void
}
const PERCENTAGES = ['25', '50', '75', '100']
export const RemoveAmount = ({ parsedAmounts, formattedAmounts, onUserInput }: Props) => {
  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput]
  )
  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
    liquidityPercentChangeCallback
  )

  return (
    <DarkCardNew>
      <AutoColumn gap="30px">
        {/* <RowBetween> */}
        <RemoveAmountTitle>
          <Trans>Remove Amount</Trans>
        </RemoveAmountTitle>
        {/* </RowBetween> */}
        {/* <Row style={{ alignItems: 'center', textAlign: 'center' }}> */}
        <Text color={'#6666FF'} fontSize={55} textAlign={'center'} fontWeight={700} lineHeight={'40px'}>
          {formattedAmounts[Field.LIQUIDITY_PERCENT]}%
        </Text>
        {/* </Row> */}
      </AutoColumn>
      <Box marginTop={'50px'}>
        <AutoColumn gap="50px">
          <Slider value={innerLiquidityPercentage} onChange={setInnerLiquidityPercentage} />
          <OptionRow>
            {PERCENTAGES.map((percentage) => (
              <NewOption
                key={percentage}
                onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, percentage)}
                active={formattedAmounts[Field.LIQUIDITY_PERCENT] === percentage}
                data-testid={'percentage_' + percentage}
              >
                {percentage !== '100' ? `${percentage}%` : <Trans>MAX</Trans>}
              </NewOption>
            ))}
          </OptionRow>
        </AutoColumn>
      </Box>
    </DarkCardNew>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Grid from '@mui/material/Grid'
import { LabelledValue } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import { formatDateToDDMonYYYY } from 'helpers/dates'
import { Typography } from '@mui/material'

export interface PrimaryCardContentProps {
  data: DigitalSecurityOffering | any
}

export const renderAmount = (
  value: number,
  symbol: string = 'SGD',
  overflow: boolean = false
) => {
  let amount = formatAmount(value ?? 0)
  let suffix = ''
  if (overflow && value > 1000000) {
    amount = formatAmount(+(value / 1000000).toFixed(2) ?? 0)
    suffix = 'M'
  }
  if (overflow && value > 1000000000) {
    amount = formatAmount(+(value / 1000000000).toFixed(2) ?? 0)
    suffix = 'B'
  }
  return (
    <Typography display={'inline'}>
      {amount}
      {suffix}{' '}
      <Typography display={'inline'} color={'text.secondary'}>
        {symbol}
      </Typography>
    </Typography>
  )
}

export const PrimaryCardContent = (props: PrimaryCardContentProps) => {
  const { data } = props
  const numbersRef = useRef<HTMLDivElement | null>(null)
  const [isOverflow, setOverflow] = useState(false)
  useEffect(() => {
    const element = numbersRef.current

    if (element !== null) {
      console.log(element?.offsetHeight)
      if (element?.offsetHeight > 58) {
        setOverflow(() => true)
      }
    }
  }, [])
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justifyContent={'center'}>
        <Grid item>
          <Typography variant={'h5'} color={'dialog.color'}>
            {data.tokenName.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent={'space-between'}>
        <Grid item>
          <LabelledValue
            isRedesigned
            item
            reverse
            valueColor={'default'}
            labelColor={'gray'}
            valueFontSize={14}
            labelFontSize={14}
            label='Closing Date'
            value={formatDateToDDMonYYYY(data.completionDate, true)}
          />
        </Grid>
        <Grid item>
          <LabelledValue
            align={'right'}
            isRedesigned
            item
            reverse
            valueColor={'default'}
            labelColor={'gray'}
            valueFontSize={14}
            labelFontSize={14}
            label={'Expected Return'}
            value={Number(
              data.capitalStructure === 'Debt'
                ? data.interestRate
                : data.grossIRR
            )
              ?.toFixed(2)
              .concat('%')}
          />
        </Grid>
      </Grid>

      <Grid ref={numbersRef} item container justifyContent={'space-between'}>
        <Grid item>
          <LabelledValue
            isRedesigned
            item
            reverse
            labelColor={'gray'}
            valueFontSize={14}
            labelFontSize={14}
            label={'Min. Investment'}
            value={renderAmount(
              data.minimumInvestment * data.pricePerUnit,
              data.currency.symbol,
              isOverflow
            )}
          />
        </Grid>

        {data.isCampaign !== true && (
          <Grid item>
            <LabelledValue
              align={'right'}
              isRedesigned
              item
              reverse
              labelColor={'gray'}
              valueFontSize={14}
              labelFontSize={14}
              label={'Total Fundraising'}
              value={renderAmount(
                data.totalFundraisingAmount,
                data.currency.symbol,
                isOverflow
              )}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

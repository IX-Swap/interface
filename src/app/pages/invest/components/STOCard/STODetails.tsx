import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Grid from '@mui/material/Grid'
import { LabelledValue } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import { formatDateToDDMonYYYY } from 'helpers/dates'
import { Divider, Typography } from '@mui/material'
import { isEmptyString } from 'helpers/strings'

export interface STODetailsProps {
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

export const STODetails = (props: STODetailsProps) => {
  const { data } = props

  return (
    <Grid container direction='column' gap={3}>
      <Grid item container justifyContent={'space-between'}>
        <Grid item xs={6}>
          <Typography color={'dialog.color'} fontWeight={'bold'}>
            {data.tokenName}
          </Typography>
        </Grid>
        <Grid item>
          <LabelledValue
            align={'right'}
            isRedesigned
            item
            reverse
            valueColor={'#778194'}
            labelColor={'default'}
            valueWeight={'normal'}
            labelWeight={'normal'}
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
      <Divider />
      <Grid item container>
        <Grid item xs>
          <LabelledValue
            isRedesigned
            item
            reverse
            valueColor={'#778194'}
            labelColor={'default'}
            valueFontSize={12}
            labelFontSize={12}
            label='Launch Date'
            value={formatDateToDDMonYYYY(data.launchDate, true)}
          />
        </Grid>
        {!isEmptyString(data.releaseDate) && (
          <Grid item xs>
            <LabelledValue
              align={'center'}
              isRedesigned
              item
              reverse
              valueColor={'#778194'}
              labelColor={'default'}
              valueFontSize={12}
              labelFontSize={12}
              label='Release Date'
              value={formatDateToDDMonYYYY(data.releaseDate, true)}
            />
          </Grid>
        )}
        <Grid item xs>
          <LabelledValue
            align={'right'}
            isRedesigned
            item
            reverse
            valueColor={'#778194'}
            labelColor={'default'}
            valueFontSize={12}
            labelFontSize={12}
            label='Completion Date'
            value={formatDateToDDMonYYYY(data.completionDate, true)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

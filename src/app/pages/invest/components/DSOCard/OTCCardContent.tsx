import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Grid from '@mui/material/Grid'
import { LabelledValue } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import { Typography } from '@mui/material'
import { renderStringToHTML } from 'app/components/DSO/utils'

export interface OTCCardContentProps {
  data: DigitalSecurityOffering | any
}

export const OTCCardContent = (props: OTCCardContentProps) => {
  const { data } = props

  const renderAmount = (value: string, symbol: string = 'SGD') => {
    return (
      <Typography display={'inline'}>
        {value}{' '}
        <Typography display={'inline'} color={'text.secondary'}>
          {symbol}
        </Typography>
      </Typography>
    )
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container direction='column' alignItems={'center'}>
        <Grid item>
          <Typography variant={'h5'} color={'dialog.color'}>
            {data.tokenName}
          </Typography>
        </Grid>

        <Grid item mt={1}>
          <Typography color={'text.secondary'}>{data.tokenSymbol}</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Typography color={'text.secondary'} fontWeight={400}>
          {renderStringToHTML(data.description)}
        </Typography>
      </Grid>

      <Grid item container justifyContent={'space-between'}>
        <Grid item>
          <LabelledValue
            isRedesigned
            item
            reverse
            labelColor={'gray'}
            valueFontSize={14}
            labelFontSize={14}
            label={'Min. Trade Amount'}
            value={renderAmount(data.minimumTradeUnits, data.tokenSymbol)}
          />
        </Grid>
        <Grid item>
          <LabelledValue
            align={'right'}
            isRedesigned
            item
            reverse
            labelColor={'gray'}
            valueFontSize={14}
            labelFontSize={14}
            label={'Target Fundraise'}
            value={renderAmount(
              formatAmount(data.raisedAmount ?? 0),
              data.tokenSymbol
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

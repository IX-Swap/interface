import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Grid from '@mui/material/Grid'
import { LabelledValue } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import { percentageToNumber } from 'app/pages/issuance/utils/utils'
import { formatDateToDDMonYYYY } from 'helpers/dates'
import { Typography } from '@mui/material'

export interface PrimaryCardContentProps {
  data: DigitalSecurityOffering | any
}

export const renderAmount = (value: number, symbol: string = 'SGD') => {
  const amount = formatAmount(value ?? 0)

  return (
    <Typography display={'inline'}>
      {amount}{' '}
      <Typography display={'inline'} color={'text.secondary'}>
        {symbol}
      </Typography>
    </Typography>
  )
}

export const PrimaryCardContent = (props: PrimaryCardContentProps) => {
  const { data } = props

  const minimumInvestmentPrice =
    data.minimumInvestment !== undefined
      ? renderAmount(
          data.minimumInvestment * data.pricePerUnit,
          data.currency.symbol
        )
      : 0

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
            value={percentageToNumber(
              data.capitalStructure === 'Debt'
                ? data.interestRate
                : data.grossIRR
            )
              ?.toFixed(2)
              .concat('%')}
          />
        </Grid>
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
            label={'Min. Investment'}
            value={minimumInvestmentPrice}
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
                data.currency.symbol
              )}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

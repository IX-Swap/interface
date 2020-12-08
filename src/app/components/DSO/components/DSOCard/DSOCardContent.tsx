import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DSOInvestLink } from 'app/components/DSO/components/DSOInvestLink'
import { DSOProgressBar } from 'app/components/DSO/components/DSOProgressBar'
import { formatMoney, abbreviateNumber } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'

export interface DSOCardContentProps {
  dso: DigitalSecurityOffering
}

export const DSOCardContent = ({ dso }: DSOCardContentProps) => {
  return (
    <Grid container spacing={4} direction='column'>
      <VSpacer size='medium' />
      <LabelledValue
        item
        reverse
        valueWeight='thin'
        labelWeight='default'
        label='Target Fundraise'
        value={abbreviateNumber(
          dso.totalFundraisingAmount,
          dso.currency.symbol
        )}
      />

      <LabelledValue
        item
        reverse
        valueWeight='thin'
        labelWeight='default'
        label='Minimum Investment'
        value={abbreviateNumber(dso.minimumInvestment, dso.tokenSymbol)}
      />

      <LabelledValue
        item
        reverse
        valueWeight='thin'
        labelWeight='default'
        label='Unit Price'
        value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
      />

      <Grid item style={{ paddingBottom: 0 }}>
        <LabelledValue
          row
          reverse
          labelWeight='default'
          valueWeight='bold'
          alignItems='baseline'
          label='Raised'
          value={abbreviateNumber(dso.insight.raisedTotal, dso.currency.symbol)}
        />

        <LabelledValue
          row
          reverse
          labelWeight='default'
          valueWeight='bold'
          alignItems='baseline'
          label='Investors'
          value={dso.insight.investorCount}
        />
      </Grid>

      <Grid item style={{ paddingTop: 0, paddingBottom: 0 }}>
        <DSOProgressBar dso={dso} showDSOStatus />
      </Grid>

      <Grid container item justify='flex-end'>
        <DSOInvestLink dso={dso} />
      </Grid>
    </Grid>
  )
}

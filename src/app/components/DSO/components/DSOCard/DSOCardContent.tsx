import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { DSOLabelledValue } from 'app/components/DSO/components/DSOCard/DSOLabelledValue'
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
      <DSOLabelledValue
        item
        label='Target Fundraise'
        value={abbreviateNumber(
          dso.totalFundraisingAmount,
          dso.currency.symbol
        )}
      />

      <DSOLabelledValue
        item
        label='Minimum Investment'
        value={abbreviateNumber(dso.minimumInvestment, dso.tokenSymbol)}
      />

      <DSOLabelledValue
        item
        label='Unit Price'
        value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
      />

      <Grid item style={{ paddingBottom: 0 }}>
        <DSOLabelledValue
          row
          valueWeight='bold'
          alignItems='baseline'
          label='Raised'
          value={abbreviateNumber(dso.insight.raisedTotal, dso.currency.symbol)}
        />

        <DSOLabelledValue
          row
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

import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { DSOOfferLabelledValue } from 'app/components/DSO/components/DSOOfferCard/DSOOfferLabelledValue'
import { DSOInvestLink } from 'app/components/DSO/components/DSOInvestLink'
import { DSOProgressBar } from 'app/components/DSO/components/DSOProgressBar'
import { formatMoney, abbreviateNumber } from 'helpers/numbers'

export interface DSOCardContentProps {
  dso: DigitalSecurityOffering
}

export const DSOCardContent = ({ dso }: DSOCardContentProps) => {
  return (
    <>
      <Grid container spacing={4} direction='column'>
        <DSOOfferLabelledValue
          item
          label='Target Fundraise'
          value={abbreviateNumber(
            dso.totalFundraisingAmount,
            dso.currency.symbol
          )}
        />

        <DSOOfferLabelledValue
          item
          label='Minimum Investment'
          value={abbreviateNumber(dso.minimumInvestment, dso.tokenSymbol)}
        />

        <DSOOfferLabelledValue
          item
          label='Unit Price'
          value={formatMoney(dso.pricePerUnit, dso.currency.symbol)}
        />

        <Grid item>
          <DSOOfferLabelledValue
            row
            valueWeight='bold'
            alignItems='baseline'
            label='Raised'
            value={abbreviateNumber(
              dso.insight.raisedTotal,
              dso.currency.symbol
            )}
          />

          <DSOOfferLabelledValue
            row
            valueWeight='bold'
            alignItems='baseline'
            label='Investors'
            value={dso.insight.investorCount}
          />
        </Grid>

        <Grid item>
          <DSOProgressBar dso={dso} showDSOStatus />
        </Grid>

        <Grid container item justify='flex-end'>
          <DSOInvestLink dso={dso} />
        </Grid>
      </Grid>
    </>
  )
}

import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid, Hidden, Tooltip } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DSOInvestLink } from 'app/components/DSO/components/DSOInvestLink'
import { DSOProgressBar } from 'app/components/DSO/components/DSOProgressBar'
import { formatMoney, abbreviateNumber } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'
import { getDSOStats } from 'app/components/DSO/utils'

export interface DSOCardContentProps {
  dso: DigitalSecurityOffering
}

export const DSOCardContent = ({ dso }: DSOCardContentProps) => {
  const { color, status, percentRaised } = getDSOStats(dso)

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

      <Hidden xsUp>
        <Grid item style={{ paddingBottom: 0 }}>
          <LabelledValue
            row
            reverse
            labelWeight='default'
            valueWeight='bold'
            alignItems='baseline'
            label='Raised'
            value={abbreviateNumber(
              dso.insight.raisedTotal,
              dso.currency.symbol
            )}
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
      </Hidden>

      <Hidden xsUp>
        <Grid item style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Tooltip
            title={`${percentRaised}%`}
            aria-label={`${percentRaised}% raised`}
          >
            <div style={{ color: color }}>
              <Grid container justifyContent='flex-end'>
                <Grid item>{status === 'live' ? 'Live' : <>&nbsp;</>}</Grid>
              </Grid>
              <DSOProgressBar dso={dso} />
            </div>
          </Tooltip>
        </Grid>
      </Hidden>

      <Grid container item justifyContent='flex-end'>
        <DSOInvestLink dso={dso} />
      </Grid>
    </Grid>
  )
}

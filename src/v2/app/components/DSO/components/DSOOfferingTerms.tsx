import React from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { monthsFormat, percentageFormat } from 'v2/config/monthsFormat'
import { renderPercentage } from 'v2/helpers/rendering'
import { PercentageRenderer } from 'v2/app/components/DSO/components/PercentageRenderer'

export interface DSOOfferingTermsProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOOfferingTerms = (props: DSOOfferingTermsProps) => {
  const { isEditing } = props
  const { EditableField, FormValue } = useDSOForm()

  return (
    <Grid item container spacing={2}>
      <Grid item xs={4} container direction='column' spacing={2}>
        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            label='Investment Period'
            name='investmentPeriod'
            numberFormat={monthsFormat}
          />
        </Grid>

        <Grid item>
          <EditableField
            fieldType='TextField'
            isEditing={isEditing}
            label='Investment Structure'
            name='investmentStructure'
          />
        </Grid>

        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            label='Interest Rate'
            name='interestRate'
            numberFormat={percentageFormat}
            viewRenderer={
              <PercentageRenderer label='Interest Rate' name='interestRate' />
            }
          />
        </Grid>
      </Grid>

      <Grid item xs={4} container direction='column' spacing={2}>
        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            name='dividendYield'
            label='Dividend Yield'
            numberFormat={percentageFormat}
            viewRenderer={
              <PercentageRenderer name='dividendYield' label='Dividend Yield' />
            }
          />
        </Grid>

        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            name='equityMultiple'
            label='Equity Multiple'
            numberFormat={percentageFormat}
            viewRenderer={
              <PercentageRenderer
                name='equityMultiple'
                label='Equity Multiple'
              />
            }
          />
        </Grid>

        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            name='leverage'
            label='Leverage'
            numberFormat={percentageFormat}
            viewRenderer={
              <PercentageRenderer name='leverage' label='Leverage' />
            }
          />
        </Grid>
      </Grid>

      <Grid item xs={4} container direction='column' spacing={2}>
        <Grid item>
          <EditableField
            fieldType='NumericField'
            isEditing={isEditing}
            name='grossIRR'
            label='Gross IRR'
            numberFormat={percentageFormat}
            viewRenderer={
              <PercentageRenderer name='grossIRR' label='Gross IRR' />
            }
          />
        </Grid>

        <Grid item>
          <EditableField
            fieldType='DistributionFrequency'
            isEditing={isEditing}
            name='distributionFrequency'
            label='Distribution Frequency'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

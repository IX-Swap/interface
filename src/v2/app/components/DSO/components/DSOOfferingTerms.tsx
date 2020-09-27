import React from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

export interface DSOOfferingTermsProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOOfferingTerms = (props: DSOOfferingTermsProps) => {
  const { isEditing } = props
  const { EditableField } = useDSOForm()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Investment Period'
          name='investmentPeriod'
        />

        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Investment Structure'
          name='investmentStructure'
        />

        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          label='Interest Rate'
          name='interestRate'
        />
      </Grid>

      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='dividendYield'
          label='Dividend Yield'
        />

        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='equityMultiple'
          label='Equity Multiple'
        />

        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='leverage'
          label='Leverage'
        />
      </Grid>

      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='grossIRR'
          label='Gross IRR'
        />

        <EditableField
          fieldType='DistributionFrequency'
          isEditing={isEditing}
          name='distributionFrequency'
          label='Distribution Frequency'
        />
      </Grid>
    </Grid>
  )
}

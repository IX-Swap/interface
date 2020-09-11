import React from 'react'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { Grid } from '@material-ui/core'

export interface FinancialsProps {
  isEditing: boolean
}

export const Financials = (props: FinancialsProps): JSX.Element => {
  const { isEditing } = props
  const { EditableField } = useIndividualIdentityForm()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='occupation'
          label='Occupation'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='employer'
          label='Employer'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='employmentStatus'
          label='Employment Status'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='industryOfEmployment'
          label='Industry'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='walletAddress'
          label='Digital Security Wallet Address'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='annualIncome'
          label='Annual Income'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='houseHoldIncome'
          label='Household Income'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='sourceOfWealth'
          label='Source of Income'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='bankName'
          label='Bank Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='bankAccountName'
          label='Name of Bank Account'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='bankAccountNumber'
          label='Bank Account Number'
        />
      </Grid>
      <Grid item xs={5}>
        <EditableField
          fieldType='Checkbox'
          isEditing={isEditing}
          name='toArrangeCustody'
          label='I would like InvestaX to arrange digital security custody'
        />
      </Grid>
    </Grid>
  )
}

import React from 'react'
import { Grid } from '@material-ui/core'
import { CorporateFields } from 'v2/types/identity'
import { useCorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

interface CompanyInformationProps {
  corporate?: Partial<CorporateFields> & { walletAddress: string }
  useOwnEmail: boolean
  rootName?: string
  isEditing: boolean
}

export const CompanyInformation = (
  props: CompanyInformationProps
): JSX.Element => {
  const { isEditing } = props
  const { EditableField } = useCorporateIdentityForm()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='companyLegalName'
          label='Company Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='registrationNumber'
          label='Company Registration Number'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='CountrySelect'
          isEditing={isEditing}
          name='countryOfFormation'
          label='Country of Formation'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='dateOfIncorporation'
          label='Date of Incorporation'
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

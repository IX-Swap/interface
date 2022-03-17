import React from 'react'
import { Grid } from '@mui/material'
import { InformationFields } from 'app/pages/identity/components/CorporateInformationForm/InformationFields'
import { CorporateAddressFields } from 'app/pages/identity/components/CorporateInformationForm/CorporateAddressFields'
import { AuthorizedPersonnelFields } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnelFields'
import { OwnershipStructureFields } from 'app/pages/identity/components/CorporateInformationForm/OwnershipStructureFields'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export interface CorporateInformationFormProps {
  type?: CorporateType
}

export const CorporateInformationForm = ({
  type = 'investor'
}: CorporateInformationFormProps) => {
  return (
    <Grid container spacing={8} direction='column'>
      <Grid item>
        <InformationFields type={type} />
      </Grid>
      <Grid item>
        <OwnershipStructureFields />
      </Grid>
      <Grid item>
        <CorporateAddressFields />
      </Grid>
      <Grid item>
        <AuthorizedPersonnelFields />
      </Grid>
    </Grid>
  )
}

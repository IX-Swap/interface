import React from 'react'
import { Grid } from '@mui/material'
import { InformationFields } from 'app/pages/identity/components/CorporateInformationForm/InformationFields'
import { CorporateAddressFields } from 'app/pages/identity/components/CorporateInformationForm/CorporateAddressFields'
import { AuthorizedPersonnelFields } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnelFields'
import { OwnershipStructureFields } from 'app/pages/identity/components/CorporateInformationForm/OwnershipStructureFields'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface CorporateInformationFormProps {
  type?: CorporateType
}

export const CorporateInformationForm = ({
  type = 'investor'
}: CorporateInformationFormProps) => {
  return (
    <Grid data-testid='corporateInformationForm' container spacing={2}>
      <Grid item xs={12}>
        <FieldContainer>
          <InformationFields type={type} />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <FieldContainer>
          <CorporateAddressFields />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <FieldContainer>
          <OwnershipStructureFields />
        </FieldContainer>
      </Grid>
      <Grid item xs={12}>
        <AuthorizedPersonnelFields />
      </Grid>
    </Grid>
  )
}

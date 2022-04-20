import React from 'react'
import { Grid, Paper } from '@mui/material'
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
    <Grid
      data-testid='corporateInformationForm'
      container
      spacing={8}
      direction='column'
    >
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <InformationFields type={type} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <OwnershipStructureFields />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <CorporateAddressFields />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <AuthorizedPersonnelFields />
        </Paper>
      </Grid>
    </Grid>
  )
}

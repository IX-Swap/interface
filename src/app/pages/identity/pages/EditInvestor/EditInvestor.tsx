import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import {
  CorporateInvestorForm,
  CorporateType
} from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface EditInvestorFormProps {
  data: CorporateIdentity
  type?: CorporateType
}

const EditInvestorForm = ({
  data,
  type = 'investor'
}: EditInvestorFormProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={data.companyLegalName} />
      </Grid>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateInvestorForm data={data} type={type} />
      </Grid>
    </Grid>
  )
}

export interface EditInvestorProps {
  type?: CorporateType
}

export const EditInvestor: React.FC<EditInvestorProps> = ({
  type = 'investor'
}) => {
  return <CorporateIdentityContainer component={EditInvestorForm} type={type} />
}

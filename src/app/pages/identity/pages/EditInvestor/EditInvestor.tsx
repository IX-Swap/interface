import React from 'react'
import { Grid } from '@mui/material'
import {
  CorporateInvestorForm,
  CorporateType
} from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { RootContainer } from 'ui/RootContainer'

export interface EditInvestorFormProps {
  data: CorporateIdentity
  type?: CorporateType
}

const EditInvestorForm = ({
  data,
  type = 'investor'
}: EditInvestorFormProps) => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title={data.companyLegalName} />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <CorporateInvestorForm
            data={data}
            type={type}
            formTitle='Corporate Investor Identity'
          />
        </Grid>
      </RootContainer>
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

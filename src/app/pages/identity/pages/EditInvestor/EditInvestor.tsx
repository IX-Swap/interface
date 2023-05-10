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
import { getCorporateTitleText } from 'app/pages/identity/utils/shared'

export interface EditInvestorFormProps {
  data: CorporateIdentity
  type?: CorporateType
}

const EditInvestorForm = ({
  data,
  type = 'corporate'
}: EditInvestorFormProps) => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12} sx={{ display: { xs: 'none', md: 'initial' } }}>
        {/* <PageHeader title={getCorporateTitleText(type, 'edit')} /> */}
        <PageHeader title={'Edit Corporate Identity'} />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <CorporateInvestorForm
            data={data}
            type={type}
            formTitle={getCorporateTitleText(type)}
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
  type = 'corporate'
}) => {
  return <CorporateIdentityContainer component={EditInvestorForm} type={type} />
}

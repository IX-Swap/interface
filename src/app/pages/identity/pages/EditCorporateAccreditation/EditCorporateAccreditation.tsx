import React from 'react'
import { Grid } from '@mui/material'
import { CorporateAccreditationForm } from 'app/pages/identity/components/CorporateAccreditationForm/CorporateAccreditationForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateAccreditationContainer } from 'app/pages/identity/containers/CorporateAccreditationContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { RootContainer } from 'ui/RootContainer'

export interface EditCorporateAccreditationFormProps {
  data: CorporateIdentity
}

const EditCorporateAccreditationForm = ({
  data
}: EditCorporateAccreditationFormProps) => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12} sx={{ display: { xs: 'none', md: 'initial' } }}>
        <PageHeader title={'Edit Corporate Investor Accreditation'} />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <CorporateAccreditationForm
            data={data}
            formTitle='Corporate Investor Accreditation'
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

export const EditCorporateAccreditation: React.FC = () => {
  return (
    <CorporateAccreditationContainer
      component={EditCorporateAccreditationForm}
    />
  )
}

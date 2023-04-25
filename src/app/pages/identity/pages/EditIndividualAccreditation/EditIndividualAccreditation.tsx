import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import {} from 'app/pages/identity/containers/CorporateAccreditationContainer'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { RootContainer } from 'ui/RootContainer'
import { IndividualAccreditationForm } from '../../components/IndividualAccreditationForm/IndividualAccreditationForm'
import { IndividualAccreditationContainer } from '../../containers/IndividualAccreditationContainer'

export interface EditAccreditationFormProps {
  data: IndividualIdentity
}

const EditIndividualAccreditationForm = ({
  data
}: EditAccreditationFormProps) => {
  return (
    <Grid container style={{ display: 'table' }}>
      <Grid item xs={12} sx={{ display: { xs: 'none', md: 'initial' } }}>
        <PageHeader title={'Edit Individual Investor Accreditation'} />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <IndividualAccreditationForm
            data={data}
            formTitle='Individual Investor Accreditation'
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

export const EditIndividualAccreditation: React.FC = () => {
  return (
    <IndividualAccreditationContainer
      component={EditIndividualAccreditationForm}
    />
  )
}

import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { getPersonName } from 'helpers/strings'
import { IndividualInvestorForm } from 'app/pages/identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { RootContainer } from 'ui/RootContainer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

const EditIndividualComponent = ({ data }: { data: IndividualIdentity }) => {
  const { isMobile } = useAppBreakpoints()
  return (
    <>
      {!isMobile && <PageHeader title={getPersonName(data)} />}
      <RootContainer>
        <Grid container item>
          <VSpacer size='medium' />
        </Grid>
        <Grid item xs={12}>
          <IndividualInvestorForm />
        </Grid>
      </RootContainer>
    </>
  )
}

export const EditIndividual = () => {
  return <IndividualIdentityContainer component={EditIndividualComponent} />
}

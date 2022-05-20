import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { IndividualInvestorForm } from 'app/pages/identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const CreateIndividual: React.FC = () => {
  const { isMobile } = useAppBreakpoints()
  return (
    <>
      {!isMobile && <PageHeader title='Create Individual Identity' />}
      <RootContainer>
        <Grid container>
          <Grid container item xs={12}>
            <VSpacer size='medium' />
          </Grid>
          <Grid item xs={12}>
            <IndividualInvestorForm />
          </Grid>
        </Grid>
      </RootContainer>
    </>
  )
}

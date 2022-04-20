import React from 'react'
import { Grid, Typography } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity } = useGetIdentities()

  return (
    <AppContentWrapper container background='default'>
      <RootContainer background='default'>
        <Grid container spacing={5}>
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h2' align='center'>
                {hasIdentity ? 'Identity' : 'Create your Identity'}
              </Typography>
            </Grid>
            {!hasIdentity && (
              <Grid item xs={12}>
                <Typography
                  variant='body1'
                  align='center'
                  color='textSecondary'
                >
                  Choose the type of Identity
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            {hasIdentity ? <IdentityPreview /> : <IdentitySelectionView />}
          </Grid>
        </Grid>
      </RootContainer>
    </AppContentWrapper>
  )
}

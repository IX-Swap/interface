import React from 'react'
import { useStyles } from './IdentitiesList.styles'
import { Box, Container, Grid, Typography } from '@mui/material'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { ReactComponent as Dot } from 'assets/icons/new/dot.svg'
import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, identityLoaded } = useGetIdentities()
  const classes = useStyles()

  return (
    <AppContentWrapper container background='default'>
      <Container className={classes.container}>
        <Grid container className={classes.grid}>
          <Grid item container className={classes.nameIdentity}>
            <Grid item xs={12}>
              <Typography variant='h3'>
                {hasIdentity
                  ? identityLoaded.user.name
                  : 'Create your Identity'}
              </Typography>
            </Grid>
            <Box className={classes.box}>
              <Typography className={classes.breadcrumbsLink}>
                Profile
              </Typography>
              <Box className={classes.dot}>
                <Dot />
              </Box>
              <Typography className={classes.breadcrumbs}>Identity</Typography>
            </Box>
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
      </Container>
    </AppContentWrapper>
  )
}

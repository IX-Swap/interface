import { Box, Grid, Typography } from '@mui/material'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
// import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'
import { useStyles } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList.styles'
import React from 'react'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { RootContainer } from 'ui/RootContainer'
import { RedirectToDefaultPage } from 'app/RedirectToDefaultPage'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, identityLoaded, isLoadingIdentities } =
    useGetIdentities()
  const classes = useStyles()

  console.log('test')

  if (!hasIdentity && !isLoadingIdentities) {
    return <RedirectToDefaultPage />
  }

  return (
    <AppContentWrapper container background='default'>
      <RootContainer>
        <Grid container className={classes.grid}>
          <Grid item container className={classes.nameIdentity}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ marginBottom: '5px' }}>
                {identityLoaded.user.name}
              </Typography>
            </Grid>
            <Box className={classes.box}>
              <Typography className={classes.breadcrumbsLink}>
                Profile
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <IdentityPreview />
          </Grid>
        </Grid>
      </RootContainer>
    </AppContentWrapper>
  )
}

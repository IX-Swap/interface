import { Box, Grid, Typography } from '@mui/material'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
// import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'
import { useStyles } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList.styles'
import React from 'react'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { RootContainer } from 'ui/RootContainer'
import { Redirect } from 'react-router-dom'
import { AppRoute } from 'app/router/config'
import { useServices } from 'hooks/useServices'
import { isEmptyString } from 'helpers/strings'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, identityLoaded, isLoadingIdentities } =
    useGetIdentities()
  const classes = useStyles()
  const { storageService } = useServices()
  const user: any = storageService.get('user')
  const isIndividual = user.accountType === 'INDIVIDUAL'

  if (!hasIdentity && !isLoadingIdentities) {
    const createKYCRoute = isIndividual
      ? '/individuals/create'
      : '/corporates/create'

    return <Redirect to={AppRoute.identity + createKYCRoute} />
  }

  return (
    <AppContentWrapper container background='default'>
      <RootContainer>
        <Grid container className={classes.grid}>
          <Grid item container className={classes.nameIdentity}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ marginBottom: '5px' }}>
                {!isIndividual &&
                !isEmptyString(identityLoaded?.companyLegalName)
                  ? identityLoaded.companyLegalName
                  : identityLoaded?.user.name}
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

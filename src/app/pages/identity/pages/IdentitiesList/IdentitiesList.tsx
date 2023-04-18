import { Box, Container, Grid, Typography } from '@mui/material'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
import { IdentitySelectionView } from 'app/pages/identity/components/IdentitySelectionView/IdentiySelectionView'
import { useStyles } from 'app/pages/identity/pages/IdentitiesList/IdentitiesList.styles'
import { ReactComponent as Dot } from 'assets/icons/new/dot.svg'
import React from 'react'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { ReactComponent as AvatarPhoto } from 'assets/icons/new/avatar_identity.svg'
import { Avatar } from 'components/Avatar'

export const IdentitiesList: React.FC = () => {
  const { hasIdentity, identityLoaded, isLoadingIdentities } =
    useGetIdentities()
  const classes = useStyles()
  console.log(identityLoaded, 'identityLoaded')
  return (
    <AppContentWrapper container background='default'>
      <Container className={classes.container}>
        <Grid container className={classes.grid}>
          <Grid item container className={classes.nameIdentity}>
            {hasIdentity && (
              <>
                <Grid item xs={12}>
                  <Typography variant='h3'>
                    {identityLoaded.user.name}
                  </Typography>
                </Grid>
                <Box className={classes.box}>
                  <Typography className={classes.breadcrumbsLink}>
                    Profile
                  </Typography>
                  <Box className={classes.dot}>
                    <Dot />
                  </Box>
                  <Typography className={classes.breadcrumbs}>
                    Identity
                  </Typography>
                </Box>
                <div className={classes.bbox}>
                  <div className={classes.item1}>
                    <Avatar
                      documentId={identityLoaded.photo}
                      ownerId={identityLoaded.user._id}
                      size={120}
                      borderRadius={50}
                      fallback={<AvatarPhoto xs={8} />}
                    />
                  </div>
                  {/* <div>Two</div>
                  <div>Three</div>
                  <div>Four</div>
                  <div>Five</div> */}
                </div>

                {/* <Grid item xs={12}>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant='h3'>
                      {identityLoaded.user.name}
                    </Typography>
                  </Grid>
                  <div>
                  <Grid item xs={8}>
                    <Avatar
                      documentId={identityLoaded.photo}
                      ownerId={identityLoaded.user._id}
                      size={120}
                      borderRadius={50}
                      fallback={<AvatarPhoto xs={8} />}
                    />
                  </Grid>
                  </div>
                  <Grid
                    xs={12}
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '30px'
                    }}
                  >
                    <Typography className={classes.investorIdentity}>
                      Investor Identity
                    </Typography>
                    <Typography className={classes.investorIdentity}>
                      Investor Role
                    </Typography>
                  </Grid>

                  <Grid
                    xs={12}
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '30px'
                    }}
                  >
                    <Typography className={classes.investorIdentitySub}>
                      {identityLoaded.user.accountType}
                    </Typography>
                    <Typography className={classes.investorIdentitySub}>
                      {identityLoaded.user.roles}
                    </Typography>
                  </Grid>
                </Grid> */}
              </>
            )}
            {!hasIdentity && !isLoadingIdentities && (
              <Grid item xs={12} className={classes.createIdentity}>
                <Typography variant='h2' align='center'>
                  Create your Identity
                </Typography>
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
            {hasIdentity && <IdentityPreview />}
            {!hasIdentity && !isLoadingIdentities && <IdentitySelectionView />}
          </Grid>
        </Grid>
      </Container>
    </AppContentWrapper>
  )
}

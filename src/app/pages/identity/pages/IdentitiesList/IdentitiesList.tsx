import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
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
          <Grid item xs={12} container style={{ zIndex: 2 }}>
            <Grid item xs={12}>
              <Typography
                fontSize={'24px'}
                fontWeight={600}
                lineHeight={'29px'}
              >
                {hasIdentity ? 'Identity' : 'Create your Identity'}
              </Typography>
            </Grid>
            <Box display='flex' justifyContent='flex-start' width='100%'>
              <Typography color='#3B4251' fontSize={'14px'} lineHeight={'24px'}>
                Profile
              </Typography>
              <Box component={'span'} borderRadius={'100px'} margin={'0 12px'}>
                <svg
                  width='4'
                  height='4'
                  viewBox='0 0 4 4'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='4' height='4' rx='2' fill='#778194' />
                </svg>
              </Box>
              <Typography color='#778194' fontSize={'14px'} lineHeight={'24px'}>
                Identity
              </Typography>
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
      </RootContainer>
    </AppContentWrapper>
  )
}

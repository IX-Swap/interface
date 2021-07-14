import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import { IdentityPreview } from 'app/pages/identity/components/IdentityPreview/IdentityPreview'
import { useTheme } from '@material-ui/core/styles'
import { RootContainer } from 'ui/RootContainer'

export const IdentitiesList: React.FC = () => {
  const theme = useTheme()
  const backgroundColor = theme.palette.backgrounds.light

  const {
    hasIdentity,
    isLoadingIdentities,
    detailsOfIssuance
  } = useGetIdentities()

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  return (
    <Box bgcolor={backgroundColor} width='100%' minHeight='100vh'>
      <RootContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PageHeader
              title='Identity'
              alignment='flex-start'
              showBreadcrumbs={false}
            />
          </Grid>
          <Grid item xs={12}>
            {hasIdentity || detailsOfIssuance !== undefined ? (
              <IdentityPreview />
            ) : (
              <NoIdentityView />
            )}
          </Grid>
        </Grid>
      </RootContainer>
    </Box>
  )
}

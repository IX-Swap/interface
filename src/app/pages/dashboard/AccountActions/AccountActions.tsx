import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { KnowYourCustomer } from './KnowYourCustomer'
import { Accreditation } from './Accreditation'
import { TwoFactorAuthentication } from './TwoFactorAuthentication'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useAuth } from 'hooks/auth/useAuth'
import { isUpdatedAtMoreThanAYear } from 'hooks/utils'

export const AccountActions = () => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa, updatedAt } = user
  const hasEnabled = enable2Fa ?? false
  const isMoreThanAYear = isUpdatedAtMoreThanAYear(updatedAt)

  const {
    isLoadingIdentities,
    identity,
    identityType,
    hasStartedKYC,
    hasSubmittedKYC,
    hasApprovedKYC,
    hasStartedAccreditation,
    hasSubmittedAccreditation
  } = useGetIdentities()

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  const showKYC = !hasSubmittedKYC
  const showAccreditation = hasApprovedKYC && !hasSubmittedAccreditation
  const show2FA = !hasEnabled || isMoreThanAYear

  return showKYC || showAccreditation || show2FA ? (
    <Grid item>
      <FieldContainer>
        <Grid container direction='column' spacing={6}>
          <Grid item>
            <Typography variant='h5' color={'otpInput.color'}>
              Account Actions
            </Typography>
            <Typography color={'text.secondary'} mt={2}>
              Complete the following actions to optimize platform experience.
            </Typography>
          </Grid>
          <Grid item container justifyContent={'center'}>
            {showKYC && (
              <Grid item xs={12} md={6}>
                <KnowYourCustomer
                  hasStarted={hasStartedKYC}
                  hasSubmitted={hasSubmittedKYC}
                  identityType={identityType}
                  identityId={identity?._id}
                  userId={identity?.user._id}
                />
              </Grid>
            )}

            {showAccreditation && (
              <Grid item xs={12} md={6}>
                <Accreditation
                  hasStarted={hasStartedAccreditation}
                  identityType={identityType}
                  identityId={identity?._id}
                  userId={identity?.user._id}
                />
              </Grid>
            )}

            {show2FA && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  borderTop: {
                    xs: showKYC || showAccreditation ? `1px solid #DBE2EC` : 0,
                    md: 0
                  },
                  borderLeft: {
                    xs: 0,
                    md: showKYC || showAccreditation ? `1px solid #DBE2EC` : 0
                  }
                }}
              >
                <TwoFactorAuthentication hasEnabled={hasEnabled} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  ) : (
    <></>
  )
}

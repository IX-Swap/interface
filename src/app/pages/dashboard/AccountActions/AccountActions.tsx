import React from 'react'
import { Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { KnowYourCustomer } from './KnowYourCustomer'
import { Accreditation } from './Accreditation'
import { TwoFactorAuthentication } from './TwoFactorAuthentication'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { useServices } from 'hooks/useServices'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const AccountActions = () => {
  const { isLoadingIdentities, individualIdentity, corporateIdentities } =
    useGetIdentities()

  const { storageService } = useServices()
  const user: any = storageService.get('user')
  const isIndividual = user.accountType === 'INDIVIDUAL'
  const hasIdentity =
    (isIndividual && individualIdentity !== undefined) ||
    (!isIndividual && corporateIdentities.list.length > 0)

  const hasStartedKYC = hasIdentity && !isLoadingIdentities
  const identityType = isIndividual ? 'individual' : 'corporate'
  const identity = isIndividual
    ? individualIdentity
    : corporateIdentities.list[0]
  const hasSubmittedKYC =
    identity?.status === 'Submitted' || identity?.status === 'Approved'
  const hasStartedAccreditation =
    typeof identity?.accreditationStatus !== 'undefined'
  const hasSubmittedAccreditation =
    identity?.accreditationStatus === 'Submitted' ||
    identity?.accreditationStatus === 'Approved'

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  return (
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
        <Grid item container>
          {!hasSubmittedKYC && (
            <Grid item xs borderRight={1} borderColor={'#DBE2EC'}>
              <KnowYourCustomer
                hasStarted={hasStartedKYC}
                identityType={identityType}
                identityId={identity?._id}
                userId={identity?.user._id}
              />
            </Grid>
          )}

          {hasSubmittedKYC && !hasSubmittedAccreditation && (
            <Grid item xs borderRight={1} borderColor={'#DBE2EC'}>
              <Accreditation
                hasStarted={hasStartedAccreditation}
                identityType={identityType}
                identityId={identity?._id}
                userId={identity?.user._id}
              />
            </Grid>
          )}

          <Grid item xs>
            <TwoFactorAuthentication />
          </Grid>
        </Grid>
      </Grid>
    </FieldContainer>
  )
}

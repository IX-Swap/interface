import { Grid } from '@mui/material'
// import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useGetIdentities } from 'app/hooks/onboarding/useGetIdentities'
import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import { CorporateIdentityButton } from 'app/pages/identity/components/IdentityPreview/CorporateIdentityButton'
import { IndividualIdentityButton } from 'app/pages/identity/components/IdentityPreview/IndividualIdentityButton'
import { IssuerIdentityButton } from 'app/pages/identity/components/IdentityPreview/IssuerIdentityButton'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import { CreateDetailsOfIssuanceButton } from 'app/pages/identity/components/NoIdentityView/CreateDetailsOfIssuanceButton'
import { CreateIssuerIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIssuerIdentityButton'
import React, { useState } from 'react'
// import { TwoFAAlert } from '../../pages/SuccessPage/TwoFAAlert'
export const IdentityPreview = () => {
  const {
    hasIdentity,
    isLoadingIdentities,
    individualIdentity,
    corporateIdentities,
    detailsOfIssuance
  } = useGetIdentities()
  const hasIndividual = individualIdentity !== undefined
  const hasCorporate =
    corporateIdentities !== undefined && corporateIdentities.list.length > 0
  const hasDetailsOfIssuance = detailsOfIssuance !== undefined
  const detailsOfIssuanceApproved =
    detailsOfIssuance?.status === 'Approved' ?? false
  const detailsOfIssuanceSkipped = detailsOfIssuance?.skipped ?? false
  const [selectedIdentity, setSelectedIdentity] = useState<
    'individual' | 'corporate'
  >(hasIndividual ? 'individual' : 'corporate')
  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }
  if (!hasIdentity && !hasDetailsOfIssuance) {
    return null
  }
  return (
    <Grid container>
      <Grid item xs={12} container>
        {
          // Removed Identity button from screen
        }
        <div style={{ display: 'none' }}>
          {hasIndividual && (
            <Grid item xs={12} md={4}>
              <IndividualIdentityButton
                active={selectedIdentity === 'individual'}
                onClick={() => setSelectedIdentity('individual')}
              />
            </Grid>
          )}
          {hasIndividual && <Grid item xs={12} md={4}></Grid>}
          {hasCorporate ? (
            <Grid item xs={12} md={4}>
              {corporateIdentities.list[0].type === 'issuer' ? (
                <IssuerIdentityButton
                  active={selectedIdentity === 'corporate'}
                  onClick={() => setSelectedIdentity('corporate')}
                />
              ) : (
                <CorporateIdentityButton
                  identity={corporateIdentities.list[0]}
                  active={selectedIdentity === 'corporate'}
                  onClick={() => setSelectedIdentity('corporate')}
                />
              )}
            </Grid>
          ) : (
            hasDetailsOfIssuance &&
            (detailsOfIssuanceApproved || detailsOfIssuanceSkipped ? (
              <CreateIssuerIdentityButton />
            ) : (
              <CreateDetailsOfIssuanceButton />
            ))
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        {selectedIdentity === 'individual' ? (
          <IndividualPreview data={individualIdentity} />
        ) : (
          <CorporatesPreview data={corporateIdentities.list[0]} />
        )}
      </Grid>
    </Grid>
  )
}
import { Grid } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useGetIdentities } from 'app/components/OnboardingPanel/hooks/useGetIdentities'
import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import React, { useState } from 'react'

export const IdentityPreview = () => {
  const {
    hasIdentity,
    isLoadingIdentities,
    individualIdentity,
    corporateIdentities,
    detailsOfIssuance
  } = useGetIdentities()

  const hasIndividual = individualIdentity !== undefined
  const hasDetailsOfIssuance = detailsOfIssuance !== undefined
  const [selectedIdentity] = useState<'individual' | 'corporate'>(
    hasIndividual ? 'individual' : 'corporate'
  )

  if (isLoadingIdentities) {
    return <LoadingIndicator />
  }

  if (!hasIdentity && !hasDetailsOfIssuance) {
    return null
  }

  return (
    <Grid container>
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

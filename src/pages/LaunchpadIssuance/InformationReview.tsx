import React, { useMemo } from 'react'

import { IssuancePageLayout } from './layout'
import { OfferReview } from 'components/LaunchpadIssuance/IssuanceForm/Review'
import { useOfferFormInitialValues } from 'state/launchpad/hooks'
import { useQueryParams } from 'hooks/useParams'
import { LoaderContainer, Centered } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useHistory } from 'react-router-dom'
import { FormTitle } from 'components/LaunchpadIssuance/IssuanceForm/shared/styled'

export default function InformationReviewPage() {
  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: string }>(['id'])
  const { data, loading, issuance } = useOfferFormInitialValues(Number(issuanceId))
  const history = useHistory()

  const formIsLoading = useMemo(() => !data?.id, [data])

  if (!loading && !issuance) {
    return (
      <IssuancePageLayout>
        <Centered height="100vh">
          <FormTitle>Issuance not found</FormTitle>
        </Centered>
      </IssuancePageLayout>
    )
  }

  if (loading || formIsLoading || !data) {
    return (
      <IssuancePageLayout>
        <LoaderContainer width="100vw" height="100vh">
          <Loader />
        </LoaderContainer>
      </IssuancePageLayout>
    )
  }

  return (
    <IssuancePageLayout>
      <OfferReview
        values={data}
        onClose={() => {
          history.push(`/issuance/create?id=${issuanceId}`)
        }}
        onSubmit={() => {
          history.push(`/issuance/create?id=${issuanceId}`)
        }}
        draftDisabled={false}
        submitDisabled={false}
      />
    </IssuancePageLayout>
  )
}

import React from 'react'

import { IssuancePageLayout } from './layout'
import { OfferReview } from 'components/LaunchpadIssuance/IssuanceForm/Review'
import { useOfferFormInitialValues } from 'state/launchpad/hooks'
import { useQueryParams } from 'hooks/useParams'
import { Centered } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useHistory } from 'react-router-dom'

export default function InformationReviewPage() {
  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: string }>(['id'])
  const { data, loading } = useOfferFormInitialValues(Number(issuanceId))
  const history = useHistory()
  return (
    <IssuancePageLayout>
      {loading && (
        <Centered>
          <Loader />
        </Centered>
      )}
      {!data ? (
        <></>
      ) : (
        <OfferReview
          values={data}
          onClose={() => {
            history.push(`/issuance/create?id=${issuanceId}`)
          }}
          onSubmit={() => {
            history.push(`/issuance/create?id=${issuanceId}`)
          }}
        />
      )}
    </IssuancePageLayout>
  )
}

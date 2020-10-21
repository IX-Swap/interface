import React from 'react'
import { useCommitmentById } from 'v2/app/pages/invest/hooks/useCommitmentById'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'

export const InvestCommitmentView = () => {
  const {
    params: { commitmentId }
  } = useOfferingsRouter()

  const { data, isLoading } = useCommitmentById(commitmentId)

  if (isLoading || data === undefined) {
    return null
  }

  return <CommitmentPreview data={data} />
}

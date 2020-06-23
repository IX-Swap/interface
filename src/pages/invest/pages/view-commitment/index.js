// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'
import CommitmentItem from '../../components/CommitmentItem'
import { useInvestState } from '../../modules'

const ViewCommitment = () => {
  const { commitment } = useInvestState()

  // TODO: Fetch instead on redirecting
  if (!commitment) {
    return <Redirect to='/invest' />
  }

  return (
    <CommitmentItem
      dso={commitment.dso}
      commitment={commitment}
      asset={(commitment.currency || {})._id}
    />
  )
}

export default ViewCommitment

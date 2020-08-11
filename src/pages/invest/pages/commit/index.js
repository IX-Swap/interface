//
import React from 'react'
import { Redirect } from 'react-router-dom'
import CommitmentItem from '../../components/CommitmentItem'
import { useInvestState } from '../../modules'

const AddCommitment = () => {
  const { dso } = useInvestState()

  // TODO: Fetch instead on redirecting
  if (!dso) {
    return <Redirect to='/invest' />
  }

  return <CommitmentItem dso={dso} asset={dso.currency[0]._id} />
}

export default AddCommitment

import React from 'react'
import { useStore } from '../context'
import CommitmentView from '../../../components/commitment'
import { useObserver } from 'mobx-react'
import { Redirect } from 'react-router-dom'

const ViewCommitment = () => {
  const state = useStore()
  return useObserver(() =>
    state.selectedCommitment ? (
      <CommitmentView commitment={state.selectedCommitment} />
    ) : (
      <Redirect to='../' />
    )
  )
}

export default ViewCommitment

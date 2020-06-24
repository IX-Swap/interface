// @flow
import React, { useState } from 'react'
import CommitmentView from './CommitmentView'
import IdentityView from './IndentityView'
import DsoView from './DsoView'
import { useHistory } from 'react-router-dom'

const authorizeCommitmentsPage = {
  VIEW: 'VIEW',
  VIEW_IDENTITY: 'VIEW_IDENTITY',
  VIEW_DSO: 'VIEW_DSO'
}

// TODO: Make the views router based not state based
const Commitments = ({ location } : any) => {
  const { commitment } = location.state || {}
  const history = useHistory()

  const [page, setPage] = useState(authorizeCommitmentsPage.VIEW)

  if (commitment && page === authorizeCommitmentsPage.VIEW) {
    return (
      <CommitmentView
        commitment={commitment}
        onClickBack={() => history.goBack()}
        onViewIdentity={() => setPage(authorizeCommitmentsPage.VIEW_IDENTITY)}
        onViewDso={() => setPage(authorizeCommitmentsPage.VIEW_DSO)}
      />
    )
  }

  if (
    commitment &&
    commitment.individual &&
    page === authorizeCommitmentsPage.VIEW_IDENTITY
  ) {
    const individual = { ...commitment.individual, user: commitment.user }
    return (
      <IdentityView
        identity={individual}
        onClickBack={() => setPage(authorizeCommitmentsPage.VIEW)}
      />
    )
  }

  if (
    commitment &&
    commitment.dso &&
    page === authorizeCommitmentsPage.VIEW_DSO
  ) {
    return (
      <DsoView
        onClickBack={() => setPage(authorizeCommitmentsPage.VIEW)}
        dso={commitment.dso}
      />
    )
  }

  return <span>hi</span>
}

export default Commitments

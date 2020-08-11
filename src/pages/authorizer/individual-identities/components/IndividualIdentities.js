//
import React, { useState } from 'react'
import IdentityList from './IdentityList'
import IndividualIdentityPreview from './IndividualIdentityPreview'

const authorizeIdentitiesPage = {
  LIST: 'LIST',
  VIEW: 'VIEW'
}

const IndividualIdentities = () => {
  const [page, setPage] = useState(authorizeIdentitiesPage.LIST)
  const [identity, setIdentity] = useState(null)

  console.log(identity)

  const onClickView = selected => {
    setIdentity(selected)
    setPage(authorizeIdentitiesPage.VIEW)
  }

  if (page === authorizeIdentitiesPage.LIST) {
    return <IdentityList onClickView={onClickView} />
  }

  if (identity && page === authorizeIdentitiesPage.VIEW) {
    return (
      <IndividualIdentityPreview
        identity={identity}
        onClickBack={() => setPage(authorizeIdentitiesPage.LIST)}
      />
    )
  }
}

export default IndividualIdentities

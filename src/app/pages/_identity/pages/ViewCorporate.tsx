import { useIdentitiesRouter } from 'app/pages/identity/router'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import React from 'react'

export const ViewCorporate = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    params: { identityId }
  } = useIdentitiesRouter()
  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return <CorporateIdentityView data={identity} />
}

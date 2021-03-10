import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import React from 'react'

export const ViewIndividual = () => {
  const { data } = useIndividualIdentity()
  if (data === undefined) {
    return null
  }

  return <IndividualIdentityView data={data} />
}

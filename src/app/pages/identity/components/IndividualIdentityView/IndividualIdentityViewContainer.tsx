import React from 'react'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'

export const IndividualIdentityViewContainer = () => {
  const { data, isLoading } = useIndividualIdentity()

  useSetPageTitle(getPersonName(data))

  if (isLoading || data === undefined) {
    return null
  }

  return <IndividualIdentityView data={data} showReview />
}

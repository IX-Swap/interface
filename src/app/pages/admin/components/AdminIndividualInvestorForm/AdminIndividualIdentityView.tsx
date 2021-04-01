import React from 'react'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { useIndividualIdentityById } from 'app/pages/admin/hooks/useIndividualIdentityById'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'
import { useParams } from 'react-router-dom'

export const AdminIndividualIdentityView = () => {
  const { userId } = useParams<{ userId: string }>()

  const { data, isLoading } = useIndividualIdentityById(userId)

  useSetPageTitle(getPersonName(data))

  if (isLoading || data === undefined) {
    return null
  }

  return <IndividualIdentityView data={data} />
}

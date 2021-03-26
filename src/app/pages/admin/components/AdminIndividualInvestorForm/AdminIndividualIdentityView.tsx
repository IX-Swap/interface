import React from 'react'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { useIndividualIdentityById } from 'app/pages/admin/hooks/useIndividualIdentityById'
import { useAdminRouter } from 'app/pages/admin/router'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'

export const AdminIndividualIdentityView = () => {
  const {
    params: { userId }
  } = useAdminRouter()

  const { data, isLoading } = useIndividualIdentityById(userId)

  useSetPageTitle(getPersonName(data))

  if (isLoading || data === undefined) {
    return null
  }

  return <IndividualIdentityView data={data} />
}

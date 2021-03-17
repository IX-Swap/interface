import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authorizerURL, issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from './columns'
import { Actions } from 'app/pages/issuance/components/Actions'
import { VSpacer } from 'components/VSpacer'
import { useIsAuthorizer } from 'helpers/acl'

export const MyDSOsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const isAuthorizer = useIsAuthorizer()
  const uri = isAuthorizer
    ? authorizerURL.offerings
    : issuanceURL.dso.getByUserId(userId)

  return (
    <>
      <VSpacer size='medium' />
      <TableView
        name={dsoQueryKeys.getDSOsByUserId(userId)}
        uri={uri}
        columns={columns}
        hasActions
        actions={Actions}
        filter={{
          status: 'Draft,Approved,Submitted,Rejected' as any // TODO: fix typings
        }}
      />
    </>
  )
}

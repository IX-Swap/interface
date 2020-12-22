import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from './columns'
import { Actions } from 'app/pages/invest/components/DSOTable/Actions'
import { VSpacer } from 'components/VSpacer'

export const MyDSOsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <>
      <VSpacer size='medium' />
      <TableView
        name={dsoQueryKeys.getDSOsByUserId(userId)}
        uri={issuanceURL.dso.getByUserId(userId)}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </>
  )
}

import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from './columns'

export const MyDSOsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  return (
    <TableView
      name={dsoQueryKeys.getDSOsByUserId(userId)}
      uri={issuanceURL.dso.getByUserId(userId)}
      columns={columns}
    />
  )
}

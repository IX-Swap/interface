import React, { useRef } from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import columns from 'app/pages/admin/columns'
import User from 'types/user'
import { Actions } from 'app/pages/admin/components/Actions'
import { usersQueryKeys } from 'config/queryKeys'

export const Users = () => {
  const ref = useRef(null)

  return (
    <TableView<User>
      innerRef={ref}
      uri='/auth/users/list'
      name={usersQueryKeys.getList}
      columns={columns}
      hasActions
      actions={({ item }) => renderActions(item, ref)}
    />
  )
}

export const renderActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)

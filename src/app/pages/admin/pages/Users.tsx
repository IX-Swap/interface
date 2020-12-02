import React, { useRef } from 'react'
import { Paper } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import columns from 'app/pages/admin/columns'
import User from 'types/user'
import { Actions } from 'app/pages/admin/components/Actions'
import { users } from 'config/queryKeys'

export const Users = () => {
  const ref = useRef(null)

  return (
    <Paper variant='elevation'>
      <TableView<User>
        innerRef={ref}
        uri='/auth/users/list'
        name={users.getList}
        columns={columns}
        hasActions
        actions={({ item }) => renderActions(item, ref)}
      />
    </Paper>
  )
}

export const renderActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)

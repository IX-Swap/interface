import React, { useRef } from 'react'
import { Paper } from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import columns from 'v2/app/pages/admin/columns'
import User from 'v2/types/user'
import { Actions } from 'v2/app/pages/admin/components/Actions'

export const Users = () => {
  const ref = useRef(null)

  return (
    <Paper variant='outlined'>
      <TableView<User>
        innerRef={ref}
        uri='/auth/users/list'
        name='usersList'
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

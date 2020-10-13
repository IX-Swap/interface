import React, { useRef } from 'react'
import { Container, Paper } from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import columns from 'v2/app/pages/admin/columns'
import User from 'v2/types/user'
import { Actions } from './components/Actions'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const AdminRoot = () => {
  const ref = useRef(null)

  return (
    <Container>
      <PageHeader alignment='flex-start' />
      <Paper>
        <TableView<User>
          innerRef={ref}
          uri='/auth/users/list'
          name='usersList'
          columns={columns}
          hasActions
          actions={({ item }) => renderActions(item, ref)}
        />
      </Paper>
    </Container>
  )
}

export const renderActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)

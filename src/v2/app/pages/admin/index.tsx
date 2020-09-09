import React, { useRef } from 'react'
import {
  Container,
  Paper
} from '@material-ui/core'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import columns from 'v2/app/pages/admin/columns'
import User from 'v2/types/user'
import { Actions } from './components/Actions'

const UserManagement = () => {
  const ref = useRef(null)

  return (
    <Container>
      <Paper>
        <TableView<User>
          innerRef={ref}
          uri='/auth/users/list'
          name='usersList'
          columns={columns}
          hasActions
          actions={({ item }) => <Actions user={item} ref={ref} />}
        />
      </Paper>
    </Container>
  )
}

export default UserManagement

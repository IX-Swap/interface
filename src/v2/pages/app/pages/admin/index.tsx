import React, { useState, useCallback, useEffect } from 'react'
import {
  Container,
  Paper,
  FormControl,
  Select,
  Input,
  ListItemText,
  MenuItem,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import TableView from '../../../../components/table-with-pagination'
import columns from './data'
import User from '../../../../types/user'
import DialogConfirmRoleChange from './dialog-confirm-role-change'

const possibleValues = [
  'user',
  'accredited',
  'authorizer',
  'admin',
  'issuer'
]

const useStyles = makeStyles({
  formControl: {
    width: 220
  }
})

const Actions = ({
  user
}: {
  user: User
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState<string[]>(user.roles.split(','))

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(user.roles.split(','))
    }
  }, [open, user])

  useEffect(() => {
    updateRoles()
  }, [updateRoles])

  const handleRoleChange = (value: string[]) => {
    setRoles(value)
  }

  const handleChange = (value: string) => {
    console.log('change is coming', value)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    console.log('set to', roles)
    setOpen(false)
  }

  return (
    <>
      <DialogConfirmRoleChange
        open={open}
        handleClose={handleClose}
        user={user}
        newRole={roles.join(',')}
        handleConfirm={handleConfirm}
      />
      <FormControl className={classes.formControl}>
        <Select
          value={roles}
          labelId='demo-mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          onClose={() => handleChange(roles.join(','))}
          input={<Input />}
          onChange={(
            ev: React.ChangeEvent<{ value: unknown }>
          ) => handleRoleChange(ev.target.value as string[])}
          renderValue={(selected: unknown) => <>{(selected as string[]).join(', ')}</>}
        >
          {possibleValues.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={roles.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

const UserManagement = () => {
  return (
    <Container>
      <Paper>
        <TableView<User>
          uri='/auth/users/list'
          name='usersList'
          columns={columns}
          filter={{ status: '' }}
          hasActions
          actions={(row: User) => <Actions user={row} />}
        />
      </Paper>
    </Container>
  )
}

export default UserManagement

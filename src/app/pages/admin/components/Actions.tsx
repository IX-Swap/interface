import React, { forwardRef } from 'react'
import { FormControl, SelectChangeEvent } from '@mui/material'
import useStyles from './Actions.styles'
import DialogConfirmRoleChange from 'app/pages/admin/components/DialogConfirmRoleChange'
import User from 'types/user'
import { useAdminView } from '../hooks/useAdminView'
import { RoleSelect } from 'components/form/RoleSelect'

export interface ActionsProps {
  user: User
}

export const Actions = forwardRef(({ user }: ActionsProps, ref: any) => {
  const classes = useStyles()
  const {
    open,
    handleClose,
    roles,
    handleConfirm,
    handleChange,
    handleRoleChange
  } = useAdminView(user, ref?.current?.refresh)
  const onClose = () => {
    if (roles.join(',') !== user.roles) {
      handleChange(roles.join(','))
    }
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
        <RoleSelect
          value={roles}
          onClose={onClose}
          onChange={(ev: SelectChangeEvent<unknown>) =>
            handleRoleChange(ev.target.value as string[])
          }
          variant='outlined'
        />
      </FormControl>
    </>
  )
})

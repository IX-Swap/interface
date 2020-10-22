import React, { forwardRef } from 'react'
import { FormControl } from '@material-ui/core'
import useStyles from './Actions.styles'
import DialogConfirmRoleChange from 'v2/app/pages/admin/components/DialogConfirmRoleChange'
import User from 'v2/types/user'
import { useAdminView } from '../hooks/useAdminView'
import { RoleSelect } from 'v2/components/form/RoleSelect'

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
          onChange={(ev: React.ChangeEvent<{ value: unknown }>) =>
            handleRoleChange(ev.target.value as string[])
          }
        />
      </FormControl>
    </>
  )
})

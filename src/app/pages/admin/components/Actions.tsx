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

  const newRoles = roles.filter((role: string) => {
    return (
      role !== 'retail' &&
      role !== 'accredited' &&
      role !== 'expert' &&
      role !== 'institutional'
    )
  })
  return (
    <>
      <DialogConfirmRoleChange
        open={open}
        handleClose={handleClose}
        user={user}
        newRole={roles
          .map(x => (x === 'tenantOwner' ? 'client' : x))
          .join(', ')}
        handleConfirm={handleConfirm}
      />
      <FormControl className={classes.formControl}>
        <RoleSelect
          investorIdentity={user.accountType}
          value={newRoles}
          verificationStatus={user?.verified}
          onClose={onClose}
          onChange={(ev: SelectChangeEvent<unknown>) =>
            handleRoleChange(ev.target.value as string[], 'userRole' as string)
          }
          variant='outlined'
          roles={[]}
        />
      </FormControl>
    </>
  )
})

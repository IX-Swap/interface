import React, { forwardRef } from 'react'
import { FormControl, SelectChangeEvent } from '@mui/material'
import useStyles from './Actions.styles'
import DialogConfirmRoleChange from 'app/pages/admin/components/DialogConfirmRoleChange'
import User from 'types/user'
import { useAdminView } from '../hooks/useAdminView'
// import { RoleSelect } from 'components/form/RoleSelect'
import { InvestorRoleSelect } from 'components/form/InvestorRoleSelect'
// import { INVESTORROLES } from 'config/roles'

export interface RoleActionsProps {
  user: User
}

export const RoleActions = forwardRef(
  ({ user }: RoleActionsProps, ref: any) => {
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
        role !== 'user' &&
        role !== 'issuer' &&
        role !== 'tenantOwner' &&
        role !== 'admin' &&
        role !== 'authorizer'
      )
    })
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
          <InvestorRoleSelect
            investorIdentity={user.accountType}
            value={newRoles}
            roles={roles}
            onClose={onClose}
            onChange={(ev: SelectChangeEvent<unknown>) =>
              handleRoleChange(ev.target.value as string[])
            }
            variant='outlined'
          />
        </FormControl>
      </>
    )
  }
)

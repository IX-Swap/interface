import React, { forwardRef } from 'react'
import {
  FormControl,
  Select,
  Input,
  ListItemText,
  MenuItem,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import DialogConfirmRoleChange from 'v2/app/pages/admin/components/DialogConfirmRoleChange'
import User from "v2/types/user"
import { useAdminView } from '../hooks/useAdminView'

const possibleValues = ['user', 'accredited', 'authorizer', 'admin', 'issuer']

const useStyles = makeStyles({
  formControl: {
    width: 220
  }
})

export const Actions = forwardRef(({ user }: { user: User }, ref: any) => {
  const classes = useStyles()
  const {
    open, handleClose, roles,
    handleConfirm, handleChange,
    handleRoleChange
  } = useAdminView(user, ref && ref.current && ref.current.refresh)

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
          onChange={(ev: React.ChangeEvent<{ value: unknown }>) =>
            handleRoleChange(ev.target.value as string[])
          }
          renderValue={(selected: unknown) => (
            <>{(selected as string[]).join(', ')}</>
          )}
        >
          {possibleValues.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={roles.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
})

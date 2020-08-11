//
import React, { useState, useCallback, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  MenuItem,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  Checkbox,
  ListItemText,
  Input
} from '@material-ui/core'

const useStyles = makeStyles({
  formControl: {
    width: 220
  }
})

export default function UsersTableBody ({ open, users, columns, handleChange }) {
  const classes = useStyles()
  const [roles, setRoles] = useState(users.map(user => user.roles.split(',')))

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(users.map(user => user.roles.split(',')))
    }
  }, [open, users])

  useEffect(() => {
    updateRoles()
  }, [updateRoles])

  const handleRoleChange = (value, index) => {
    setRoles(
      users.map((user, i) => (index === i ? value : user.roles.split(',')))
    )
  }

  const possibleValues = [
    'user',
    'accredited',
    'authorizer',
    'admin',
    'issuer'
  ]

  return (
    <TableBody>
      {users &&
        users.length === roles.length &&
        users.map((row, index) => (
          <TableRow key={row._id}>
            {columns.map(col => (
              <TableCell key={`${row._id}-${col.label}`}>
                {col.render ? col.render(row[col.key]) : row[col.key]}
              </TableCell>
            ))}
            <TableCell>
              <FormControl className={classes.formControl}>
                <Select
                  labelId='demo-mutiple-checkbox-label'
                  id='demo-mutiple-checkbox'
                  multiple
                  value={roles[index]}
                  onChange={ev => handleRoleChange(ev.target.value, index)}
                  onClose={() => handleChange(roles[index].join(','), row)}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                >
                  {possibleValues.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={roles[index].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  )
}

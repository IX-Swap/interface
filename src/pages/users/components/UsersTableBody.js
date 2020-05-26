// @flow
import React, { useState, useCallback, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  MenuItem,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  Checkbox,
  ListItemText,
  Input,
} from '@material-ui/core';

import type { User, TableColumns } from '../modules/types';

const useStyles = makeStyles({
  formControl: {
    width: 220,
  },
});

type Prop = {
  open: boolean,
  users: Array<User>,
  columns: Array<TableColumns>,
  handleChange: (newRole: string, row: User) => void,
};

export default function UsersTableBody({
  open,
  users,
  columns,
  handleChange,
}: Prop) {
  const classes = useStyles();
  const [roles, setRoles] = useState(
    users.map((user) => user.roles.split(','))
  );

  const updateRoles = useCallback(() => {
    if (!open) {
      setRoles(users.map((user) => user.roles.split(',')));
    }
  }, [open, users]);

  useEffect(() => {
    updateRoles();
  }, [updateRoles]);

  const handleRoleChange = (value: Array<string>, index: number) => {
    setRoles(
      users.map((user, i: number) =>
        index === i ? value : user.roles.split(',')
      )
    );
  };

  const possibleValues = [
    'user',
    'accredited',
    'authorizer',
    'admin',
    'issuer',
  ];

  return (
    <TableBody>
      {users &&
        users.map((row, index) => (
          <TableRow key={row._id}>
            {columns.map((col) => (
              <TableCell key={`${row._id}-${col.label}`}>
                {col.render ? col.render(row[col.key]) : row[col.key]}
              </TableCell>
            ))}
            <TableCell>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={roles[index]}
                  onChange={(ev) => handleRoleChange(ev.target.value, index)}
                  onClose={() => handleChange(roles[index].join(','), row)}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {possibleValues.map((name) => (
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
  );
}

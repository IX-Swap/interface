// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import type { User } from '../modules/types';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

type Prop = {
  users: Array<User>,
  handleChange: (evt: SyntheticInputEvent<HTMLElement>, row: User) => void,
};

export default function UsersTableBody({ users, handleChange }: Prop) {
  const classes = useStyles();

  return (
    <TableBody>
      {users &&
        users.map((row) => (
          <TableRow key={row._id}>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Select
                className={classes.formControl}
                value={row.roles}
                onChange={(evt) => handleChange(evt, row)}
                inputProps={{
                  name: 'roles',
                }}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="authorizer">authorizer</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
}

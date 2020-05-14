import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

export default function UsersTableBody({ users, handleChange }) {
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

UsersTableBody.propTypes = {
  users: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

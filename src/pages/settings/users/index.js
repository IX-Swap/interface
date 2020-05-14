// @flow
import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import DialogConfirmRoleChange from './components/DialogConfirmRoleChange';
import UsersTableBody from './components/UsersTableBody';

import {
  UsersListProvider,
  useUsersListState,
  useUsersListDispatch,
} from './modules/index';
import { getUsersList, updateUserRole, setPage } from './modules/actions';
import { USERS_LIST_STATUS } from './modules/types';

import type { User } from './modules/types';

function useUsersListLogic() {
  const mountedRef = useRef(true);

  const { users, limit, status, total, page } = useUsersListState();
  const usersDispatch = useUsersListDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [role, setRole] = React.useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt, userToUpdate) => {
    setRole(evt.target.value);
    setUser(userToUpdate);

    setOpen(true);
  };

  const handleConfirm = async (userToUpdate: User, newRole: string) => {
    await updateUserRole(usersDispatch, {
      userId: userToUpdate._id,
      roles: newRole,
    });

    setOpen(false);

    getUsersList(usersDispatch, {
      limit,
      skip: (page - 1) * limit,
      ref: mountedRef,
    });
  };

  const handleChangePage = (_, newPage: number) => {
    setPage(usersDispatch, { page: newPage });
  };

  useEffect(() => {
    if (status === USERS_LIST_STATUS.INIT) {
      getUsersList(usersDispatch, {
        skip: (page - 1) * limit,
        limit,
        ref: mountedRef,
      });
    }
  }, [limit, page, status, usersDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    handleClose,
    handleChange,
    handleConfirm,
    handleChangePage,
    open,
    user,
    role,
    users,
    status,
    total,
    page,
  };
}

function UsersWithProvider() {
  return (
    <UsersListProvider>
      <Users />
    </UsersListProvider>
  );
}

function Users() {
  const {
    handleClose,
    handleChange,
    handleConfirm,
    handleChangePage,
    open,
    user,
    role,
    users,
    status,
    total,
    page,
  } = useUsersListLogic();

  return (
    <>
      {user && (
        <DialogConfirmRoleChange
          open={open}
          handleClose={handleClose}
          user={user}
          newRole={role}
          handleConfirm={handleConfirm}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          {status !== USERS_LIST_STATUS.IDLE ? (
            <TableBody>
              <TableRow>
                <TableCell>loding</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <UsersTableBody users={users} handleChange={handleChange} />
          )}
        </Table>
        <Grid
          style={{ padding: 10 }}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Pagination count={total} page={page} onChange={handleChangePage} />
        </Grid>
      </TableContainer>
    </>
  );
}

export default withRouter(UsersWithProvider);

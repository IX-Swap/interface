// @flow
import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

import DialogConfirmRoleChange from './components/DialogConfirmRoleChange';
import UsersTableBody from './components/UsersTableBody';

import UsersModule from './modules/index';
import Actions from './modules/actions';
import type { User } from './modules/types';

const { getUsersList, setPage, setRowsPerPage, updateUserRole } = Actions;
const {
  UserListProvider,
  useUsersListState,
  useUsersListDispatch,
  USERS_LIST_STATUS,
} = UsersModule;

function useUsersListLogic() {
  const mountedRef = useRef(true);

  const { items, limit, status, total, page } = useUsersListState();
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
      skip: page * limit,
      ref: mountedRef,
    });
  };

  const handleChangePage = (_, newPage: number) => {
    setPage(usersDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(usersDispatch, { rows: newRows });
    setPage(usersDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === USERS_LIST_STATUS.INIT) {
      getUsersList(usersDispatch, {
        skip: page * limit,
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
    handleChangeRowsPerPage,
    open,
    user,
    role,
    users: items,
    status,
    limit,
    total,
    page,
  };
}

function UsersWithProvider() {
  return (
    <UserListProvider>
      <Users />
    </UserListProvider>
  );
}

function Users() {
  const {
    handleClose,
    handleChange,
    handleConfirm,
    handleChangePage,
    handleChangeRowsPerPage,
    open,
    user,
    role,
    users,
    status,
    limit,
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
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={2}
                  count={total}
                  rowsPerPage={limit}
                  page={page}
                  onChangeRowsPerPage={(
                    evt: SyntheticInputEvent<HTMLElement>
                  ) => handleChangeRowsPerPage(parseInt(evt.target.value))}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default withRouter(UsersWithProvider);

// @flow
import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableRow,
  TableFooter,
  TablePagination,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Box,
  LinearProgress,
  Typography,
  Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import PageTitle from 'components/PageTitle';
import DialogConfirmRoleChange from './components/DialogConfirmRoleChange';
import UsersTableBody from './components/UsersTableBody';

import UsersModule from './modules/index';
import Actions from './modules/actions';
import type { User, TableColumns } from './modules/types';

const { getUsersList, setPage, setRowsPerPage, updateUserRole } = Actions;
const {
  UserListProvider,
  useUsersListState,
  useUsersListDispatch,
  USERS_LIST_STATUS,
} = UsersModule;

function useUsersListLogic() {
  const mountedRef = useRef(true);

  const {
    items,
    limit,
    status,
    total,
    page,
    error,
    statusCode,
  } = useUsersListState();
  const usersDispatch = useUsersListDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [role, setRole] = React.useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (val, userToUpdate) => {
    setRole(val);
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
    error,
    statusCode,
  };
}

const columns: Array<TableColumns> = [
  {
    key: 'accountType',
    label: 'Account Type',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'twoFactorAuth',
    label: '2-Factor Auth',
    render: (is2fa) =>
      is2fa ? (
        <Typography color="primary">Yes</Typography>
      ) : (
        <Typography color="error">No</Typography>
      ),
  },
];

function UsersWithProvider() {
  return (
    <UserListProvider>
      <Container>
        <PageTitle title="Users" />
        <Users />
      </Container>
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
    error,
    statusCode,
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
      {error && <Alert severity="error">{error}</Alert>}
      {statusCode !== 403 && (
        <Box mt={2}>
          <TableContainer component={Paper}>
            {status === USERS_LIST_STATUS.GETTING && <LinearProgress />}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <b>{col.label}</b>
                    </TableCell>
                  ))}
                  <TableCell>
                    <b>Roles</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {status === USERS_LIST_STATUS.INIT && (
                <TableBody>
                  <TableRow>
                    <TableCell>loding</TableCell>
                  </TableRow>
                </TableBody>
              )}
              {users && users.length ? (
                // $FlowFixMe
                <UsersTableBody
                  open={open}
                  users={users}
                  handleChange={handleChange}
                  columns={columns}
                />
              ) : null}
              {total && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={columns.length}
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
        </Box>
      )}
    </>
  );
}

export default withRouter(UsersWithProvider);

// @flow
import React, { useRef, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  LinearProgress,
  TableBody,
} from '@material-ui/core';
import { snackbarService } from 'uno-material-ui';
import type { Identity } from 'pages/identity/modules/types';
import IdentityListModule from '../modules';
import Actions from '../modules/actions';
import IdentityListItem from './IdentityListItem';
import AuthorizeConfirmDialog from './AuthorizeConfirmDialog';

const {
  useAuhorizerIdentityListState,
  useAuhorizerIdentityListDispatch,
  AUTHORIZER_IDENTITY_LIST_STATUS,
} = IdentityListModule;
const {
  getIdentities,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleIdentityStatus,
} = Actions;

const useIdentityListLogic = () => {
  const identityListDispatch = useAuhorizerIdentityListDispatch();
  const identityListState = useAuhorizerIdentityListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = identityListState;
  const mountedRef = useRef(true);
  const [newStatus, setNewStatus] = useState<string>('');
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleChangePage = (_, newPage: number) => {
    setPage(identityListDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(identityListDispatch, { rows: newRows });
    setPage(identityListDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_IDENTITY_LIST_STATUS.INIT) {
      getIdentities(identityListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(identityListDispatch);
    }
  }, [page, limit, status, identityListDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    identityListDispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    newStatus,
    setNewStatus,
    identity,
    setIdentity,
    open,
    setOpen,
    toggleIdentityStatus,
  };
};

const IdentityList = () => {
  const {
    status: loadingStatus,
    items,
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
    newStatus,
    setNewStatus,
    identity,
    setIdentity,
    open,
    setOpen,
  } = useIdentityListLogic();

  const handleSelectChange = (mIdentity: Identity, status: string) => {
    setIdentity(mIdentity);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mIdentity: Identity, status: string) => {
    const confirm = await toggleIdentityStatus(mIdentity, status);
    let message = 'Failed to update withdraw status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated withdraw status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {identity && (
        <AuthorizeConfirmDialog
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          identity={identity}
          handleConfirm={handleConfirm}
        />
      )}

      {[AUTHORIZER_IDENTITY_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}

      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Applicant Type</b>
              </TableCell>
              <TableCell align="left">
                <b>Date of Application</b>
              </TableCell>
              <TableCell align="left">
                <b>Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Country</b>
              </TableCell>
              <TableCell align="left">
                <b>&nbsp;</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((identity) => (
              <IdentityListItem
                key={identity._id}
                identity={identity}
                handleSelectChange={handleSelectChange}
              />
            ))}
          </TableBody>
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
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
};

export default IdentityList;

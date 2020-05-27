import React, { useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TableBody,
} from '@material-ui/core';

import CommitmentListItem from './CommitmentListItem';
import Module from '../modules';
import Actions from '../modules/actions';

const {
  useAuthorizerCommitmentListState,
  useAuthorizerCommitmentListDispatch,
  AUTHORIZER_COMMITMENT_LIST_STATUS,
} = Module;
const {
  getCommitments,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleIdentityStatus,
} = Actions;

const useCommitmentsListLogic = () => {
  const commitmentListDispatch = useAuthorizerCommitmentListDispatch();
  const commitmentListState = useAuthorizerCommitmentListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = commitmentListState;
  const mountedRef = useRef(true);

  const handleChangePage = (_, newPage: number) => {
    setPage(commitmentListDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(commitmentListDispatch, { rows: newRows });
    setPage(commitmentListDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_COMMITMENT_LIST_STATUS.INIT) {
      getCommitments(commitmentListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(commitmentListDispatch);
    }
  }, [page, limit, status, commitmentListDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    commitmentListDispatch,
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
    toggleIdentityStatus,
  };
};

const CommitmentsList = ({ onClickView }: { onClickView: Function }) => {
  const {
    status: loadingStatus,
    items: commitments = [],
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useCommitmentsListLogic();

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Applicant Type</b>
              </TableCell>
              <TableCell>
                <b>Date of Commitment</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Issuer</b>
              </TableCell>
              <TableCell>
                <b>Project Name</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>DSO Tokens</b>
              </TableCell>
              <TableCell>
                <b>&nbsp;</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commitments.map((commitment) => (
              <CommitmentListItem
                key={commitment._id}
                commitment={commitment}
                onClickView={onClickView}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CommitmentsList;

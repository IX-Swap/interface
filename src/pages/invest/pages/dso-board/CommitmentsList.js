// @flow
import React, { useEffect, useRef } from 'react';
import {
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  LinearProgress,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import CommitmentListItem from './CommitmentListItem';
import Module from './modules';
import Actions from './modules/actions';

const {
  useCommitmentsListState,
  useCommitmentsListDispatch,
  COMMITMENTS_LIST_STATUS,
} = Module;
const { getCommitmentsList, setPage, setRowsPerPage, clearApiStatus } = Actions;

const useCommitmentsListLogic = () => {
  const commitmentsListState = useCommitmentsListState();
  const commitmentsListDispatch = useCommitmentsListDispatch();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = commitmentsListState;
  const mountedRef = useRef(true);

  const handleChangePage = (_, newPage: number) => {
    setPage(commitmentsListDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(commitmentsListDispatch, { rows: newRows });
    setPage(commitmentsListDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === COMMITMENTS_LIST_STATUS.INIT) {
      getCommitmentsList(commitmentsListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(commitmentsListDispatch);
    }
  }, [page, limit, status, commitmentsListDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    commitmentsListDispatch,
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
  };
};

const CommitmentsList = () => {
  const {
    status: loadingStatus,
    items: commitmentsList = [],
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useCommitmentsListLogic();

  return (
    <TableContainer>
      {[COMMITMENTS_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Unit Price</b>
            </TableCell>
            <TableCell>
              <b>Capital Structure</b>
            </TableCell>
            <TableCell>
              <b>Investment Amount</b>
            </TableCell>
            <TableCell>
              <b>Number of Digital Securities</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commitmentsList.map((commitment) => (
            <CommitmentListItem key={commitment._id} commitment={commitment} />
          ))}
        </TableBody>
        {total && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={total}
                rowsPerPage={limit}
                page={page}
                onChangeRowsPerPage={(evt: SyntheticInputEvent<HTMLElement>) =>
                  handleChangeRowsPerPage(parseInt(evt.target.value))
                }
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default CommitmentsList;

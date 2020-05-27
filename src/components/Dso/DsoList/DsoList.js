// @flow
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  TextField,
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  LinearProgress,
} from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import OfferCard from './OfferCard';
import DsoListModule from './modules';
import Actions from './modules/actions';

const { useDsoListState, useDsoListDispatch, DSO_LIST_STATUS } = DsoListModule;
const { getDsoList, setPage, setRowsPerPage, clearApiStatus } = Actions;

const useDsoListLogic = () => {
  const dsoListDispatch = useDsoListDispatch();
  const dsoListState = useDsoListState();
  const { status, page, total, limit, items, statusCode, error } = dsoListState;
  const mountedRef = useRef(true);

  const handleChangePage = (_, newPage: number) => {
    setPage(dsoListDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(dsoListDispatch, { rows: newRows });
    setPage(dsoListDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === DSO_LIST_STATUS.INIT) {
      getDsoList(dsoListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(dsoListDispatch);
    }
  }, [page, limit, status, dsoListDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    dsoListDispatch,
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

const DsoList = ({ onClickView }: { onClickView: Function }) => {
  const {
    status: loadingStatus,
    items: dsoList = [],
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useDsoListLogic();

  return (
    <Container>
      {[DSO_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}

      <Box mb={4}>
        <TextField fullWidth variant="outlined" placeholder="Search" />
      </Box>

      <Table aria-label="accounts table">
        <TableBody>
          {dsoList.map((dso) => (
            <TableRow key={dso._id}>
              <TableCell style={{ borderBottom: 'none' }}>
                <OfferCard dso={dso} onClickView={() => onClickView(dso)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {total && (
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ borderBottom: 'none' }}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
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
    </Container>
  );
};

export default DsoList;

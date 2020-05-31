// @flow
import * as React from 'react';
import {
  TableContainer,
  TableBody,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  LinearProgress,
} from '@material-ui/core';
import { get, isFunction } from 'lodash';
import init from './modules';
import type { Module, ModuleActions, ModuleMeta } from './modules';

const { useRef, useEffect } = React;

type TableColumn<T> = {
  key: $Keys<T>,
  label: string,
  render: (val: any) => string,
  align?: ?string,
};

type BaseRequirements<T> = {
  id: string,
  columns: Array<TableColumn<T>>,
  endpoint: string,
  onMount: Function,
  children?: (...props: any) => Node | React.Element<any>,
};

type ItemsProps = {
  items: Array<any>,
  columns: Array<TableColumn<any>>,
  children?: (...props: any) => Node | React.Element<any>,
};

type TableWithPaginationProps<T> = {
  requirements: Module,
  columns: Array<TableColumn<T>>,
  onMount: Function,
  children?: (...props: any) => Node | React.Element<any>,
};

const initializeRequirements = (id: string, endpoint: string) =>
  init(id, endpoint);

const usePaginationLogic = (actions: ModuleActions, meta: ModuleMeta) => {
  const { PAGINATION_STATUS, useDispatch, useState } = meta;
  const { setPage, setRowsPerPage, getter, clearApiStatus } = actions;
  const dispatch = useDispatch();
  const state = useState();
  const { status, page, total, limit, items, statusCode, error } = state;
  const mountedRef = useRef(true);

  const handleChangePage = (_, newPage: number) => {
    setPage(dispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(dispatch, { rows: newRows });
    setPage(dispatch, { page: 0 });
  };

  const reload = () => {
    setPage(dispatch, { page });
  };

  useEffect(() => {
    if (status === PAGINATION_STATUS.INIT) {
      getter(dispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(dispatch);
    }
  }, [
    page,
    limit,
    status,
    dispatch,
    getter,
    clearApiStatus,
    PAGINATION_STATUS,
  ]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    dispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    error,
    reload,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    PAGINATION_STATUS,
  };
};

const Items = ({ items, columns, children }: ItemsProps) => (
  <TableBody>
    {items.length ? (
      items.map((row) => (
        <TableRow hover key={row._id}>
          {columns.map((e) => (
            <TableCell align="left" key={e.key}>
              {e.key &&
                (e.render ? e.render(get(row, e.key)) : get(row, e.key))}
              {!e.key && children && children(row)}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell align="center" colSpan={5}>
          No Data
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);

const TableWithPagination = ({
  columns,
  requirements,
  children,
  onMount,
}: TableWithPaginationProps<any>) => {
  const { actions, meta } = requirements;
  const {
    items,
    total,
    limit,
    page,
    PAGINATION_STATUS,
    handleChangeRowsPerPage,
    handleChangePage,
    status,
    reload,
  } = usePaginationLogic(actions, meta);

  if (onMount && isFunction(onMount)) {
    onMount(reload);
  }

  return (
    <>
      {[PAGINATION_STATUS.GETTING].includes(status) ? <LinearProgress /> : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              {columns.map((e) => (
                <TableCell key={e.key} align="left">
                  <b>{e.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <Items items={items} columns={columns}>
            {children}
          </Items>
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

const MainComponent = ({
  id,
  endpoint,
  columns,
  children,
  onMount,
}: BaseRequirements<any>) => {
  const Reqts = initializeRequirements(id, endpoint);

  return (
    <Reqts.meta.Provider>
      <TableWithPagination
        columns={columns}
        requirements={Reqts}
        onMount={onMount}
      >
        {children}
      </TableWithPagination>
    </Reqts.meta.Provider>
  );
};

export default MainComponent;

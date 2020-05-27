// @flow
import React, { useRef, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Select,
  MenuItem,
  Paper,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { snackbarService } from 'uno-material-ui';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import type { Dso } from 'context/dso/types';
import { useHistory } from 'react-router-dom';
import type { TableColumns } from './modules/types';
import WithdrawListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerDsoListDispatch,
  useAuhorizerDsoListState,
  AUTHORIZER_DSO_LIST_STATUS,
} = WithdrawListModule;
const {
  getWithdraws,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleWithdrawStatus,
} = Actions;

function useWithdrawListLogic() {
  const withdrawDispatch = useAuhorizerDsoListDispatch();
  const withdrawListState = useAuhorizerDsoListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = withdrawListState;
  const mountedRef = useRef(true);
  const [withdraw, setWithdraw] = useState<Dso | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleChangePage = (_, newPage: number) => {
    setPage(withdrawDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(withdrawDispatch, { rows: newRows });
    setPage(withdrawDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_DSO_LIST_STATUS.INIT) {
      getWithdraws(withdrawDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(withdrawDispatch);
    }
  }, [page, limit, status, withdrawDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    withdrawDispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    open,
    setOpen,
    withdraw,
    setWithdraw,
    setPage,
    newStatus,
    setNewStatus,
  };
}

const RowStatusComponent = ({
  dso,
  handleSelectChange,
}: {
  dso: Dso,
  handleSelectChange: (dso: Dso, status: string) => void,
}) => {
  const classes = useStyles();
  switch (dso.status) {
    case 'Approved':
      return (
        <Typography display="inline" color="primary">
          Approved
        </Typography>
      );
    case 'Rejected':
      return (
        <Typography display="inline" color="error">
          Rejected
        </Typography>
      );
    default:
      return (
        <Select
          className={classes.formControl}
          value={dso.status}
          onClick={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            evt.nativeEvent.stopPropagation();
            evt.nativeEvent.stopImmediatePropagation();
          }}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) => {
            handleSelectChange(dso, evt.target.value);
          }}
          inputProps={{
            name: 'status',
          }}
        >
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      );
  }
};

const columns: Array<TableColumns> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    // $$FlowFixMe
    render: (a: string) => moment(a).format('MM/DD/YYYY hh:mm:ss a'),
  },
  {
    key: 'tokenName',
    label: 'Digital Security',
  },
  {
    key: 'tokenSymbol',
    label: 'Symbol',
  },
  {
    key: 'minimumInvestment',
    label: 'Minimum Investment',
    align: 'right',
    // $$FlowFixMe
    render: (amount: number) =>
      amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '',
  },
];

const Withdraws = ({
  list,
  handleSelectChange,
}: {
  list: Array<Dso>,
  handleSelectChange: (dso: Dso, status: string) => void,
}) => {
  const history = useHistory();

  const viewDso = (id: string) => {
    history.push(`/authorizer/digital-securities/${id}`);
  };

  return (
    <TableBody>
      {list.length ? (
        list.map((row) => (
          <TableRow hover key={row._id} onClick={() => viewDso(row._id)}>
            {columns.map((e) => (
              <TableCell align={e.align || 'left'}>
                {e.render ? e.render(row[e.key]) : row[e.key]}
              </TableCell>
            ))}
            <TableCell align="left">
              <RowStatusComponent
                dso={row}
                handleSelectChange={handleSelectChange}
              />
            </TableCell>
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
};

export default function BanksList() {
  const {
    status: loadingStatus,
    items,
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,

    open,
    setOpen,
    withdraw,
    setWithdraw,
    newStatus,
    setNewStatus,
  } = useWithdrawListLogic();

  const handleSelectChange = (mDso: Dso, status: string) => {
    setWithdraw(mDso);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mDso: Dso, status: string) => {
    const confirm = await toggleWithdrawStatus(mDso, status);
    let message = 'Failed to update digital security status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated digital security status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {withdraw && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          withdraw={withdraw}
          handleConfirm={handleConfirm}
        />
      )}
      {[AUTHORIZER_DSO_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              {columns.map((e) => (
                <TableCell key={e.key}>
                  <b>{e.label}</b>
                </TableCell>
              ))}
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <Withdraws list={items} handleSelectChange={handleSelectChange} />
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
}

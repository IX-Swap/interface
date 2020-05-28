// @flow
import React, { useRef, useEffect, useState } from 'react';
import { withRouter, RouteProps } from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core/styles';
// TODO: move bank module to context?
import type { Bank } from 'pages/accounts/bank/modules/types';
import moment from 'moment';
import { get } from 'lodash';
import type { TableColumn } from './modules/types';
import BankListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerBanksListState,
  useAuhorizerBanksListDispatch,
  AUTHORIZER_BANK_LIST_STATUS,
} = BankListModule;
const {
  getBankAccounts,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleBankStatus,
} = Actions;

function useBankListLogic() {
  const bankDispatch = useAuhorizerBanksListDispatch();
  const bankListState = useAuhorizerBanksListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = bankListState;
  const mountedRef = useRef(true);
  const [bank, setBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleChangePage = (_, newPage: number) => {
    setPage(bankDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(bankDispatch, { rows: newRows });
    setPage(bankDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(bankDispatch);
    }
  }, [page, limit, status, bankDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    bankDispatch,
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
    bank,
    setBank,
    setPage,
    newStatus,
    setNewStatus,
  };
}

const columns: Array<TableColumn> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: (val: string) => moment(val).format('MM/DD/YY'),
  },
  {
    key: 'bankName',
    label: 'Bank Name',
  },
  {
    key: 'accountHolderName',
    label: 'Account Holder Name',
  },
  {
    // $FlowFixMe
    key: 'asset.symbol',
    label: 'Currency',
  },
  {
    key: 'bankAccountNumber',
    label: 'Bank Account Number',
  },
];

const RowStatusComponent = ({
  bank,
  handleSelectChange,
}: {
  bank: Bank,
  handleSelectChange: (bank: Bank, status: string) => void,
}) => {
  const classes = useStyles();
  switch (bank.status) {
    case 'Approved':
      return <Typography color="primary">Approved</Typography>;
    case 'Rejected':
      return <Typography color="error">Rejected</Typography>;
    default:
      return (
        <Select
          className={classes.formControl}
          value={bank.status}
          onClick={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            evt.nativeEvent.stopPropagation();
            evt.nativeEvent.stopImmediatePropagation();
          }}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(bank, evt.target.value)
          }
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

const redirectModel = [
  {
    label: 'Bank Name',
    key: 'bankName',
  },
  {
    label: 'Account Holder Name',
    key: 'accountHolderName',
  },
  {
    label: 'Currency',
    // $FlowFixMe
    key: 'asset.symbol',
  },
  {
    label: 'Bank AccountNumber',
    key: 'bankAccountNumber',
  },
  {
    label: 'Swift Code',
    key: 'swiftCode',
  },
  {
    label: '',
    // $FlowFixMe
    key: '',
  },
  {
    label: 'Line 1',
    key: 'address.line1',
  },
  {
    label: 'Line 2',
    key: 'address.line2',
  },
  {
    label: 'City',
    key: 'address.city',
  },
  {
    label: 'State',
    key: 'address.state',
  },
  {
    label: 'Country',
    key: 'address.country',
  },
  {
    label: 'Postal Code',
    key: 'address.postalCode',
  },
];

const BankAccounts = ({
  list,
  handleSelectChange,
  history,
}: {
  history: any,
  list: Array<Bank>,
  handleSelectChange: (bank: Bank, status: string) => void,
}) => (
  <TableBody>
    {list.length ? (
      list.map((row) => (
        <TableRow
          hover
          key={row._id}
          onClick={() =>
            history.push({
              pathname: '/authorizer/summary',
              state: { data: row, model: redirectModel },
            })
          }
        >
          {columns.map((e) => (
            <TableCell align="left" key={e.key}>
              {e.render ? e.render(get(row, e.key)) : get(row, e.key)}
            </TableCell>
          ))}
          <TableCell align="left">
            <RowStatusComponent
              bank={row}
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

function BanksList({ history }: RouteProps) {
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
    bank,
    setBank,
    newStatus,
    setNewStatus,
  } = useBankListLogic();

  const handleSelectChange = (mBank: Bank, status: string) => {
    setBank(mBank);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mBank: Bank, status: string) => {
    const confirm = await toggleBankStatus(mBank, status);
    let message = 'Failed to update bank status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated bank status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {bank && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          bank={bank}
          handleConfirm={handleConfirm}
        />
      )}
      {[AUTHORIZER_BANK_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              {columns.map((e) => (
                <TableCell key={e.key} align="left">
                  <b>{e.label}</b>
                </TableCell>
              ))}
              <TableCell align="left">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <BankAccounts
            history={history}
            list={items}
            handleSelectChange={handleSelectChange}
          />
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

export default withRouter(BanksList);

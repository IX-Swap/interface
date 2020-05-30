// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { Typography, Select, MenuItem } from '@material-ui/core';
import TableWithPagination from 'components/TableWithPagination';
import type { Bank } from 'pages/accounts/bank/modules/types';
import { makeStyles } from '@material-ui/core/styles';
import { snackbarService } from 'uno-material-ui';
import DialogAuthorizeConfirmation from './confirm';
import { columns } from './data';
import Actions from './modules/actions';

const { toggleBankStatus } = Actions;

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const useBanksListLogic = () => {
  const [bank, setBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [seed, setSeed] = useState(0);
  const [newStatus, setNewStatus] = useState<string>('');
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
      setOpen(false);
    }

    setSeed(seed + 1);
    snackbarService.showSnackbar(message, type);
  };

  return {
    seed,
    bank,
    open,
    newStatus,
    handleSelectChange,
    handleClose,
    handleConfirm,
  };
};

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

const MemoizedTable = React.memo(({ handleSelectChange }: any) => {
  const mColumns = columns;
  return (
    <TableWithPagination
      id="authorizerBanksList"
      endpoint="/accounts/banks/list/"
      columns={mColumns}
    >
      {(mBank: Bank) => (
        <RowStatusComponent
          bank={mBank}
          handleSelectChange={handleSelectChange}
        />
      )}
    </TableWithPagination>
  );
});
MemoizedTable.displayName = 'MemoizedTable';

export default function Banks() {
  const {
    open,
    newStatus,
    handleClose,
    bank,
    handleConfirm,
    handleSelectChange,
    seed,
  } = useBanksListLogic();

  const mHandleSelectChange = useCallback(
    (mBank: Bank, status: string) => {
      handleSelectChange(mBank, status);
    },
    [seed]
  );

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
      <MemoizedTable handleSelectChange={mHandleSelectChange} />
    </>
  );
}

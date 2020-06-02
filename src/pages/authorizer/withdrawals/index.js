// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Select, MenuItem, Button, Grid } from '@material-ui/core';
import TableWithPagination from 'components/TableWithPagination';
import { makeStyles } from '@material-ui/core/styles';
import { snackbarService } from 'uno-material-ui';
import { isFunction } from 'lodash';
import type { Withdraw } from './modules/types';
import DialogAuthorizeConfirmation from './confirm';
import Actions from './modules/actions';
import { columns } from './data';

const { toggleWithdrawStatus } = Actions;

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const useWithdrawsListLogic = () => {
  const [withdraw, setWithdraw] = useState<Withdraw | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [cb, setCb] = useState(() => () => {});
  const [newStatus, setNewStatus] = useState<string>('');
  const handleSelectChange = useCallback(
    (mWithdraw: Withdraw, status: string) => {
      setWithdraw(mWithdraw);
      setNewStatus(status);
      setOpen(true);
    },
    []
  );

  const handleCbChange = useCallback((mCb: any) => {
    setCb(mCb);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mWithdraw: Withdraw, status: string) => {
    const confirm = await toggleWithdrawStatus(mWithdraw, status);
    let message = 'Failed to update withdrawal status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated withdrawal status!';
      type = 'success';
      setOpen(false);
    }

    if (cb && isFunction(cb)) {
      cb();
    }

    snackbarService.showSnackbar(message, type);
  };

  return {
    withdraw,
    open,
    newStatus,
    handleSelectChange,
    handleClose,
    handleConfirm,
    handleCbChange,
  };
};

const RowStatusComponent = ({
  withdraw,
  handleSelectChange,
}: {
  withdraw: Withdraw,
  handleSelectChange: (withdraw: Withdraw, status: string) => void,
}) => {
  const classes = useStyles();
  switch (withdraw.status) {
    case 'Approved':
      return <Typography color="primary">Approved</Typography>;
    case 'Rejected':
      return <Typography color="error">Rejected</Typography>;
    default:
      return (
        <Select
          className={classes.formControl}
          value={withdraw.status}
          onClick={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            evt.nativeEvent.stopPropagation();
            evt.nativeEvent.stopImmediatePropagation();
          }}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(withdraw, evt.target.value)
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

const MemoizedTable = React.memo(({ handleSelectChange, onMount }: any) => {
  const history = useHistory();
  return (
    <TableWithPagination
      id="authorizerWithdrawsList"
      endpoint="/accounts/cash/withdrawals/"
      columns={columns}
      onMount={onMount}
    >
      {(mWithdraw: Withdraw) => (
        <Grid container direction="row" alignItems="center">
          <RowStatusComponent
            withdraw={mWithdraw}
            handleSelectChange={handleSelectChange}
          />
          <Button
            onClick={() =>
              history.push({
                pathname: '/authorizer/withdrawals/view',
                state: { withdrawal: mWithdraw },
              })
            }
            style={{
              marginLeft: '16px',
            }}
          >
            View
          </Button>
        </Grid>
      )}
    </TableWithPagination>
  );
});
MemoizedTable.displayName = 'MemoizedTable';

export default function Withdraws() {
  const {
    open,
    newStatus,
    handleClose,
    withdraw,
    handleConfirm,
    handleSelectChange,
    handleCbChange,
  } = useWithdrawsListLogic();

  const mHandleSelectChange = useCallback(
    (mWithdraw: Withdraw, status: string) => {
      handleSelectChange(mWithdraw, status);
    },
    []
  );

  const onMount = useCallback((callback) => {
    handleCbChange(() => callback);
  }, []);

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
      <MemoizedTable
        handleSelectChange={mHandleSelectChange}
        onMount={onMount}
      />
    </>
  );
}

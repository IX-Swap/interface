// @flow
import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BankFormComponent from './BankFormComponent';
import Actions from './modules/actions';
import BankListModule from './modules';

import type { BankRequest } from './modules/types';

const { useBanksListDispatch } = BankListModule;
const { createBankAccount, setPage } = Actions;

type EditBankComponentProps = {
  open: boolean,
  handleClose: Function,
  onFinish: Function,
  bank: BankRequest,
};

function useEditBankLogic(baseBank: BankRequest, onFinish) {
  const [bank, setBank] = useState(baseBank);
  const bankListDispatch = useBanksListDispatch();
  // setBank(bank);
  const onChange = useCallback(
    (mBank: BankRequest) => {
      setBank(mBank);
    },
    [setBank]
  );

  const onSave = () => {
    const payload = {
      userId: '5ebcf457d67958b03c7caa87',
      bank: {
        _id: baseBank._id,
        ...bank,
        asset: bank.asset,
      },
    };

    createBankAccount(bankListDispatch, payload)
      .then(() => {
        setPage(bankListDispatch, { page: 0 });
        onFinish();
      })
      .catch();
  };

  return {
    onChange,
    onSave,
  };
}

export default function EditBankComponent({
  open,
  handleClose,
  bank,
  onFinish,
}: EditBankComponentProps) {
  const { onChange, onSave } = useEditBankLogic(bank, onFinish);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Bank Details</DialogTitle>
        <DialogContent>
          <BankFormComponent bank={bank} onChange={onChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

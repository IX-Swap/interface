//
import React, { useCallback, useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import BankFormComponent from './BankFormComponent'
import Actions from './modules/actions'
import BankListModule from './modules'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@material-ui/core'

const { useBanksListDispatch, useBanksListState } = BankListModule
const { createBankAccount } = Actions

function useEditBankLogic (baseBank, onFinish) {
  const { statusCode, error } = useBanksListState()
  const [bank, setBank] = useState(baseBank)
  const bankListDispatch = useBanksListDispatch()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)

  // setBank(bank);
  const onChange = useCallback(
    (mBank, result) => {
      setBank(mBank)
      setIsValidForm(result)
    },
    [setBank]
  )

  const onSave = () => {
    const payload = {
      bank: {
        _id: baseBank._id,
        ...bank,
        asset: bank.asset
      }
    }

    createBankAccount(bankListDispatch, payload)
  }

  const memOnFinish = useCallback(() => {
    onFinish(true)
  }, [onFinish])

  useEffect(() => {
    if (statusCode && statusCode !== 200 && error) {
      setSnackbarOpen(true)
      return
    }

    if (statusCode) {
      memOnFinish()
    }
  }, [statusCode, error, memOnFinish])

  return {
    snackbarOpen,
    isValidForm,
    onChange,
    onSave,
    error
  }
}

export default function EditBankComponent ({
  open,
  handleClose,
  bank,
  onFinish
}) {
  const {
    onChange,
    onSave,
    snackbarOpen,
    error,
    isValidForm
  } = useEditBankLogic(bank, onFinish)

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Edit Bank Details</DialogTitle>
        <DialogContent>
          {snackbarOpen && (
            <Box mb={2}>
              <Alert severity='error'>{error}</Alert>
            </Box>
          )}
          <BankFormComponent bank={bank} onChange={onChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSave} color='primary' disabled={!isValidForm}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

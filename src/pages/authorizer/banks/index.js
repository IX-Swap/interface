//
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper
} from '@material-ui/core'
import TableWithPagination from 'components/TableWithPagination'

import { makeStyles } from '@material-ui/core/styles'
import { snackbarService } from 'uno-material-ui'
import { isFunction } from 'lodash'
import DialogAuthorizeConfirmation from './confirm'
import { columns } from './data'
import Actions from './modules/actions'

const { toggleBankStatus } = Actions

const useStyles = makeStyles({
  formControl: {
    minWidth: 120
  }
})

const useBanksListLogic = () => {
  const [bank, setBank] = useState(null)
  const [open, setOpen] = useState(false)
  const [cb, setCb] = useState(() => () => {})
  const [newStatus, setNewStatus] = useState('')
  const handleSelectChange = useCallback((mBank, status) => {
    setBank(mBank)
    setNewStatus(status)
    setOpen(true)
  }, [])

  const handleCbChange = useCallback(mCb => {
    setCb(mCb)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async (mBank, status) => {
    const confirm = await toggleBankStatus(mBank, status)
    let message = 'Failed to update bank status!'
    let type = 'error'

    if (confirm) {
      message = 'Successfully updated bank status!'
      type = 'success'
      setOpen(false)
    }

    if (cb && isFunction(cb)) {
      cb()
    }

    snackbarService.showSnackbar(message, type)
  }

  return {
    bank,
    open,
    newStatus,
    handleSelectChange,
    handleClose,
    handleConfirm,
    handleCbChange
  }
}

const RowStatusComponent = ({ bank, handleSelectChange }) => {
  const classes = useStyles()
  switch (bank.status) {
    case 'Approved':
      return (
        <Typography className={classes.formControl} color='primary'>
          Approved
        </Typography>
      )
    case 'Rejected':
      return (
        <Typography className={classes.formControl} color='error'>
          Rejected
        </Typography>
      )
    default:
      return (
        <Select
          className={classes.formControl}
          value={bank.status}
          onClick={evt => {
            evt.stopPropagation()
            evt.preventDefault()
            evt.nativeEvent.stopPropagation()
            evt.nativeEvent.stopImmediatePropagation()
          }}
          onChange={evt => handleSelectChange(bank, evt.target.value)}
          inputProps={{
            name: 'status'
          }}
        >
          <MenuItem value='Approved'>Approved</MenuItem>
          <MenuItem value='Rejected'>Rejected</MenuItem>
        </Select>
      )
  }
}

const redirectModel = [
  {
    label: 'Bank Name',
    key: 'bankName'
  },
  {
    label: 'Account Holder Name',
    key: 'accountHolderName'
  },
  {
    label: 'Currency',
    // $FlowFixMe
    key: 'asset.symbol'
  },
  {
    label: 'Bank AccountNumber',
    key: 'bankAccountNumber'
  },
  {
    label: 'Swift Code',
    key: 'swiftCode'
  },
  {
    label: '',
    // $FlowFixMe
    key: ''
  },
  {
    label: 'Line 1',
    key: 'address.line1'
  },
  {
    label: 'Line 2',
    key: 'address.line2'
  },
  {
    label: 'City',
    key: 'address.city'
  },
  {
    label: 'State',
    key: 'address.state'
  },
  {
    label: 'Country',
    key: 'address.country'
  },
  {
    label: 'Postal Code',
    key: 'address.postalCode'
  }
]

const MemoizedTable = React.memo(({ handleSelectChange, onMount }) => {
  const history = useHistory()
  return (
    <Paper style={{ width: '100%' }}>
      <TableWithPagination
        id='authorizerBanksList'
        endpoint='/accounts/banks/list/'
        columns={columns}
        onMount={onMount}
      >
        {mBank => (
          <Grid container direction='row' alignItems='center'>
            <RowStatusComponent
              bank={mBank}
              handleSelectChange={handleSelectChange}
            />
            <Button
              onClick={() =>
                history.push({
                  pathname: '/authorizer/summary',
                  state: { data: mBank, model: redirectModel }
                })}
              style={{
                marginLeft: '16px'
              }}
            >
              View
            </Button>
          </Grid>
        )}
      </TableWithPagination>
    </Paper>
  )
})
MemoizedTable.displayName = 'MemoizedTable'

export default function Banks () {
  const {
    open,
    newStatus,
    handleClose,
    bank,
    handleConfirm,
    handleSelectChange,
    handleCbChange
  } = useBanksListLogic()

  const mHandleSelectChange = useCallback((mBank, status) => {
    handleSelectChange(mBank, status)
  }, [])

  const onMount = useCallback(callback => {
    handleCbChange(() => callback)
  }, [])

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
      <MemoizedTable
        handleSelectChange={mHandleSelectChange}
        onMount={onMount}
      />
    </>
  )
}

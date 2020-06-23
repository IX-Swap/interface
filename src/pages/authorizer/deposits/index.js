// @flow
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
import type { Deposit } from './modules/types'
import DialogAuthorizeConfirmation from './confirm'
import Actions from './modules/actions'
import { columns } from './data'

const { toggleDepositStatus } = Actions

const useStyles = makeStyles({
  formControl: {
    minWidth: 120
  }
})

const useDepositsListLogic = () => {
  const [deposit, setDeposit] = useState<Deposit | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [cb, setCb] = useState(() => () => {})
  const [newStatus, setNewStatus] = useState<string>('')
  const handleSelectChange = useCallback(
    (mDeposit: Deposit, status: string) => {
      setDeposit(mDeposit)
      setNewStatus(status)
      setOpen(true)
    },
    []
  )

  const handleCbChange = useCallback((mCb: any) => {
    setCb(mCb)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async (mDeposit: Deposit, status: string) => {
    const confirm = await toggleDepositStatus(mDeposit, status)
    let message = 'Failed to update deposit status!'
    let type = 'error'

    if (confirm) {
      message = 'Successfully updated deposit status!'
      type = 'success'
      setOpen(false)
    }

    if (cb && isFunction(cb)) {
      cb()
    }

    snackbarService.showSnackbar(message, type)
  }

  return {
    deposit,
    open,
    newStatus,
    handleSelectChange,
    handleClose,
    handleConfirm,
    handleCbChange
  }
}

const RowStatusComponent = ({
  deposit,
  handleSelectChange
}: {
  deposit: Deposit,
  handleSelectChange: (deposit: Deposit, status: string) => void,
}) => {
  const classes = useStyles()
  switch (deposit.status) {
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
          value={deposit.status}
          onClick={(evt) => {
            evt.stopPropagation()
            evt.preventDefault()
            evt.nativeEvent.stopPropagation()
            evt.nativeEvent.stopImmediatePropagation()
          }}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(deposit, evt.target.value)}
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

const MemoizedTable = React.memo(({ handleSelectChange, onMount }: any) => {
  const history = useHistory()
  return (
    <Paper style={{ width: '100%' }}>
      <TableWithPagination
        id='authorizerDepositsList'
        endpoint='/accounts/cash/deposits/'
        columns={columns}
        onMount={onMount}
      >
        {(mDeposit: Deposit) => (
          <Grid container direction='row' alignItems='center'>
            <RowStatusComponent
              deposit={mDeposit}
              handleSelectChange={handleSelectChange}
            />
            <Button
              onClick={() =>
                history.push({
                  pathname: '/authorizer/deposits/view',
                  state: { deposit: mDeposit }
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

export default function Deposits () {
  const {
    open,
    newStatus,
    handleClose,
    deposit,
    handleConfirm,
    handleSelectChange,
    handleCbChange
  } = useDepositsListLogic()

  const mHandleSelectChange = useCallback(
    (mDeposit: Deposit, status: string) => {
      handleSelectChange(mDeposit, status)
    },
    []
  )

  const onMount = useCallback((callback) => {
    handleCbChange(() => callback)
  }, [])

  return (
    <>
      {deposit && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          deposit={deposit}
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

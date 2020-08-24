//
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Alert from '@material-ui/lab/Alert'

import { withRouter, useHistory } from 'react-router-dom'
import storageHelper from 'services/storageHelper'
import { useIsAccredited } from 'services/acl'
import { snackbarService } from 'uno-material-ui'
import TableWithPagination from 'components/TableWithPagination'
import { columns } from './data'

import EditBankComponent from './EditBankComponent'
import BankListModule from './modules'
import Actions from './modules/actions'

const {
  useBanksListDispatch,
  useBanksListState,
  BANK_LIST_STATUS
} = BankListModule
const { getBankAccounts, setPage, setRowsPerPage, clearApiStatus } = Actions

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

function useBankListLogic () {
  const bankDispatch = useBanksListDispatch()
  const bankListState = useBanksListState()
  const { status, page, total, limit, items, statusCode, error } = bankListState
  const mountedRef = useRef(true)
  const [activeBank, setActiveBank] = useState(baseBankRequest)
  const [editOpen, setEditOpen] = useState(false)

  const handleChangePage = (_, newPage) => {
    setPage(bankDispatch, { page: newPage })
  }

  const handleChangeRowsPerPage = newRows => {
    setRowsPerPage(bankDispatch, { rows: newRows })
    setPage(bankDispatch, { page: 0 })
  }

  const bankToBankRequest = bank => ({
    _id: bank._id,
    asset: bank.asset._id,
    accountHolderName: bank.accountHolderName,
    bankName: bank.bankName,
    swiftCode: bank.swiftCode,
    bankAccountNumber: bank.bankAccountNumber,
    address: bank.address || {}
  })

  const editBank = bank => {
    clearApiStatus(bankDispatch)
    setActiveBank(bankToBankRequest(bank))
    setEditOpen(true)
  }

  const closeEdit = saved => {
    setEditOpen(false)
    setPage(bankDispatch, { page })
    setActiveBank(baseBankRequest)

    if (saved) {
      snackbarService.showSnackbar(
        'Successfully updated bank account details!',
        false
      )
    }
  }

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef
      })
      clearApiStatus(bankDispatch)
    }
  }, [page, limit, status, bankDispatch])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    bankDispatch,
    items,
    status,
    total,
    limit,
    activeBank,
    page,
    editOpen,
    statusCode,
    error,
    closeEdit,
    editBank,
    handleChangePage,
    handleChangeRowsPerPage
  }
}

function BankListComponent ({ hasApproved }) {
  const {
    error,
    items,
    status,
    statusCode,

    editOpen,
    closeEdit,
    activeBank,

    editBank
  } = useBankListLogic()
  const history = useHistory()
  const isAccredited = useIsAccredited()
  let componentToRender = <CircularProgress />

  if ([BANK_LIST_STATUS.IDLE].includes(status)) {
    componentToRender = <AddBankAccount />
  }

  if (items && items.length > 0) {
    componentToRender = (
      <>
        <Box mx={4} mt={4}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Grid item xs={3}>
              <Typography variant='h3'>Bank Accounts</Typography>
            </Grid>

            <Grid item container xs={9} justify='flex-end'>
              {isAccredited && hasApproved && (
                <Box pr={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ marginRight: '8px' }}
                    onClick={() => {
                      history.push('/accounts/banks/deposit')
                    }}
                  >
                    Deposit
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      history.push('/accounts/banks/withdraw')
                    }}
                  >
                    Withdraw
                  </Button>
                </Box>
              )}
              <Button
                m={3}
                variant='contained'
                color='primary'
                onClick={() => {
                  history.push('/accounts/banks/bank-create')
                }}
              >
                ADD BANK ACCOUNT
              </Button>
            </Grid>
          </Grid>
        </Box>
        {activeBank.bankAccountNumber && (
          <EditBankComponent
            open={editOpen}
            handleClose={() => closeEdit(false)}
            bank={activeBank}
            onFinish={() => closeEdit(true)}
          />
        )}

        <Grid item md={12}>
          <Box p={3}>
            <TableWithPagination
              id='accountBankList'
              endpoint={`/accounts/banks/list/${storageHelper.getUserId()}`}
              columns={columns}
            >
              {mBank => (
                <>
                  <IconButton
                    aria-label='edit'
                    onClick={() => {
                      editBank(mBank)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Button
                    onClick={() =>
                      history.push({
                        pathname: '/accounts/banks/view',
                        state: { data: mBank, model: redirectModel }
                      })}
                    style={{
                      marginLeft: '16px'
                    }}
                  >
                    View
                  </Button>
                </>
              )}
            </TableWithPagination>
          </Box>
        </Grid>
      </>
    )
  }

  if (statusCode === 403) {
    componentToRender = (
      <Box m={3}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    )
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {componentToRender}
      </Grid>
    </Grid>
  )
}

// TODO: fix this any
function AddBankAccount ({ props }) {
  const history = useHistory()
  return (
    <Grid>
      <Box m={4} p={4}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Typography paragraph>
            You have not added a bank account. Please add a bank account.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/accounts/banks/bank-create')
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Grid>
      </Box>
    </Grid>
  )
}

const ApprovedGetter = () => {
  const mountedRef = useRef(true)
  const bankDispatch = useBanksListDispatch()
  const bankListState = useBanksListState()
  const [checked, setChecked] = useState(false)
  const [hasApproved, setHasApproved] = useState(false)
  const [filter, setFilter] = useState('')
  const { status, page, limit, items } = bankListState

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        status: 'Approved',
        ref: mountedRef
      })
      setFilter('Approved')
      setChecked(false)
      clearApiStatus(bankDispatch)
    }

    if (status === BANK_LIST_STATUS.IDLE) {
      if (!filter) {
        setPage(bankDispatch, { page: 0 })
        return
      }

      if (checked) return
      if (items.length && items[0].status === 'Approved') {
        setHasApproved(true)
      }

      setChecked(true)
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef
      })
    }
  }, [status])

  return status === BANK_LIST_STATUS.IDLE && checked ? (
    <BankListComponent hasApproved={hasApproved} />
  ) : (
    <span>loading</span>
  )
}

export default withRouter(ApprovedGetter)

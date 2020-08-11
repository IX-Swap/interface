//
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Table,
  TableContainer,
  TableFooter,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  LinearProgress,
  TablePagination,
  ButtonGroup,
  Button,
  Box,
  Grid,
  Typography
} from '@material-ui/core'

import { useAssetsState, useAssetsDispatch } from 'context/assets'

import * as AssetsActions from 'context/assets/actions'
import PersonalBalancesListModule from 'context/balance/personal'

import Actions from 'context/balance/personal/actions'

const columns = [
  {
    label: 'Symbol',
    key: 'symbol'
  },
  {
    label: 'Name',
    key: 'name'
  },
  {
    label: 'Total Balance',
    key: 'balance',
    headAlign: 'right',
    align: 'right',
    render: value =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'Available Balance',
    key: 'available',
    headAlign: 'right',
    align: 'right',
    render: value =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  },
  {
    label: 'On Hold',
    key: 'onHold',
    headAlign: 'right',
    align: 'right',
    render: value =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
]

const { setAssetType } = AssetsActions

const {
  usePersonalBalancesListDispatch,
  usePersonalBalancesListState,
  PERSONAL_BALANCE_LIST_STATUS
} = PersonalBalancesListModule
const {
  getPersonalBalanceList,
  clearApiStatus,
  setPage,
  setRowsPerPage
} = Actions

const useBalancesLogic = () => {
  const mountedRef = useRef(true)
  const pBDispatch = usePersonalBalancesListDispatch()
  const { status, page, limit, items, total } = usePersonalBalancesListState()

  useEffect(() => {
    if (status === PERSONAL_BALANCE_LIST_STATUS.INIT) {
      getPersonalBalanceList(pBDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
        type: 'Security'
      })
      clearApiStatus(pBDispatch)
    }
  }, [page, limit, status, pBDispatch])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    items,
    page,
    pBDispatch,
    status,
    total,
    limit
  }
}

function useGetters () {
  const mountedRef = useRef(true)
  const { status: assetsStatus, type } = useAssetsState()
  const aDispatch = useAssetsDispatch()

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT || type !== 'Security') {
      setAssetType(aDispatch, { ref: mountedRef, type: 'Security' })
    }
  }, [aDispatch, assetsStatus, type])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    type,
    assetsStatus
  }
}

function useDigitalSecuritiesLogic () {
  const { type, assetsStatus } = useGetters()
  const { items, page, pBDispatch, status, total, limit } = useBalancesLogic()

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.IDLE && type === 'Security') {
      setPage(pBDispatch, { page })
    }
  }, [type, assetsStatus, page, pBDispatch])

  const handleChangePage = (_, newPage) => {
    setPage(pBDispatch, { page: newPage })
  }

  const handleChangeRowsPerPage = newRows => {
    setRowsPerPage(pBDispatch, { rows: newRows })
    setPage(pBDispatch, { page: 0 })
  }

  return {
    items,
    status,
    total,
    page,
    limit,
    handleChangeRowsPerPage,
    handleChangePage
  }
}

export default function DigitalSecurities () {
  const {
    items,
    status,
    total,
    page,
    limit,
    handleChangeRowsPerPage,
    handleChangePage
  } = useDigitalSecuritiesLogic()
  const history = useHistory()

  const renderRowActions = row => (
    <ButtonGroup
      variant='text'
      color='primary'
      aria-label='text primary button group'
    >
      <Button
        onClick={() => {
          history.push(`/accounts/wallets/view/${row.assetId}`)
        }}
      >
        View
      </Button>
      <Button
        onClick={() => {
          history.push(`/accounts/wallets/deposit/${row.assetId}`)
        }}
      >
        Deposit
      </Button>
      <Button
        onClick={() => {
          history.push(`/accounts/wallets/withdraw/${row.assetId}`)
        }}
      >
        Withdraw
      </Button>
    </ButtonGroup>
  )

  return (
    <Box m={4}>
      <Grid item xs={3}>
        <Typography variant='h3'>Digital Securities</Typography>
      </Grid>
      <Box mt={2} />
      <TableContainer>
        {status === PERSONAL_BALANCE_LIST_STATUS.GETTING && <LinearProgress />}
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map(e => (
                <TableCell align={e.headAlign || 'left'} key={e.label}>
                  <b>{e.label}</b>
                </TableCell>
              ))}
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={index}>
                {columns.map(e => (
                  <TableCell key={e.key} align={e.align || 'left'}>
                    {(e.render && e.render(row[e.key])) || row[e.key]}
                  </TableCell>
                ))}
                <TableCell>{renderRowActions(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={columns.length}
                  count={total}
                  rowsPerPage={limit}
                  page={page}
                  onChangeRowsPerPage={evt =>
                    handleChangeRowsPerPage(parseInt(evt.target.value))}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Box>
  )
}

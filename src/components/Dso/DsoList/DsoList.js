// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import {
  Container,
  TextField,
  Box,
  Grid,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  LinearProgress
} from '@material-ui/core'
import { debounce } from 'lodash'
import { useHistory } from 'react-router-dom'
import { useIsIssuer } from 'services/acl'
import OfferCard from './OfferCard'
import DsoListModule from './modules'
import Actions from './modules/actions'
import { init } from './modules/actions_filtered'

const { useDsoListState, useDsoListDispatch, DSO_LIST_STATUS } = DsoListModule
let {
  getDsoList: getList,
  setPage: _setPage,
  setRowsPerPage: _setRowsPerPage,
  clearApiStatus: _clearApiStatus
} = Actions

const useDsoListLogic = (statusFilter?: string, user?: string) => {
  const isIssuer = useIsIssuer()
  const dsoListDispatch = useDsoListDispatch()
  const dsoListState = useDsoListState()
  const [search, setSearch] = useState('')
  const { status, page, total, limit, items, statusCode, error } = dsoListState
  const mountedRef = useRef(true)
  const [onSearch] = useState(() =>
    debounce((evt) => setSearch(evt.target.value), 500)
  )

  useEffect(() => {
    const override = user ? init(user) : Actions
    getList = override.getDsoList
    _setPage = override.setPage
    _setRowsPerPage = override.setRowsPerPage
    _clearApiStatus = override.clearApiStatus
  }, [user])

  const handleChangePage = (_, newPage: number) => {
    _setPage(dsoListDispatch, { page: newPage })
  }

  const handleChangeRowsPerPage = (newRows: number) => {
    _setRowsPerPage(dsoListDispatch, { rows: newRows })
    _setPage(dsoListDispatch, { page: 0 })
  }

  const _onSearch = (evt) => {
    evt.persist()
    onSearch(evt)
  }

  useEffect(() => {
    _setPage(dsoListDispatch, { page: 0 })
  }, [search])

  useEffect(() => {
    if (status === DSO_LIST_STATUS.INIT) {
      getList(dsoListDispatch, {
        skip: page * limit,
        limit,
        status: statusFilter,
        search,
        ref: mountedRef
      })
      _clearApiStatus(dsoListDispatch)
    }
  }, [page, limit, status, statusFilter, dsoListDispatch, user])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    dsoListDispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    onSearch: _onSearch,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    _setPage,
    isIssuer
  }
}

const DsoList = ({
  onClickView,
  status = undefined,
  user = ''
}: {
  user?: string,
  status?: string,
  onClickView: Function,
}) => {
  const {
    isIssuer,
    status: loadingStatus,
    items: dsoList = [],
    total,
    limit,
    onSearch,
    page,
    handleChangeRowsPerPage,
    handleChangePage
  } = useDsoListLogic(status, user)

  const history = useHistory()

  return (
    <Container>
      {[DSO_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}

      <Box mb={4}>
        <Grid container style={{ padding: '0 16px' }}>
          <TextField
            variant='outlined'
            placeholder='Search'
            onChange={onSearch}
            style={{ flexGrow: 1 }}
          />
          {isIssuer && (
            <Button
              variant='contained'
              color='primary'
              style={{ minWidth: '100px', marginLeft: '10px' }}
              onClick={() => history.push('/issuance/create')}
            >
              Add
            </Button>
          )}
        </Grid>
      </Box>

      <Table aria-label='accounts table'>
        <TableBody>
          {/* $FlowFixMe */}
          {dsoList.map((dso) => (
            // $FlowFixMe
            <TableRow key={dso._id}>
              <TableCell style={{ borderBottom: 'none' }}>
                {/* $FlowFixMe */}
                <OfferCard dso={dso} onClickView={() => onClickView(dso)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {total && (
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ borderBottom: 'none' }}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={total}
                rowsPerPage={limit}
                page={page}
                onChangeRowsPerPage={(evt: SyntheticInputEvent<HTMLElement>) =>
                  handleChangeRowsPerPage(parseInt(evt.target.value))}
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Container>
  )
}

export default DsoList

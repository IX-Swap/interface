//
import React, { useRef, useEffect } from 'react'
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  LinearProgress,
  TableBody
} from '@material-ui/core'
import IdentityListModule from '../modules'
import Actions from '../modules/actions'
import IdentityListItem from './IdentityListItem'

const {
  useAuhorizerIdentityListState,
  useAuhorizerIdentityListDispatch,
  AUTHORIZER_IDENTITY_LIST_STATUS
} = IdentityListModule
const {
  getIdentities,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleIdentityStatus
} = Actions

const useIdentityListLogic = () => {
  const identityListDispatch = useAuhorizerIdentityListDispatch()
  const identityListState = useAuhorizerIdentityListState()
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error
  } = identityListState
  const mountedRef = useRef(true)

  const handleChangePage = (_, newPage) => {
    setPage(identityListDispatch, { page: newPage })
  }

  const handleChangeRowsPerPage = newRows => {
    setRowsPerPage(identityListDispatch, { rows: newRows })
    setPage(identityListDispatch, { page: 0 })
  }

  useEffect(() => {
    if (status === AUTHORIZER_IDENTITY_LIST_STATUS.INIT) {
      getIdentities(identityListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef
      })
      clearApiStatus(identityListDispatch)
    }
  }, [page, limit, status, identityListDispatch])

  useEffect(
    () => () => {
      mountedRef.current = false
    },
    []
  )

  return {
    identityListDispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    toggleIdentityStatus
  }
}

const IdentityList = ({ onClickView }) => {
  const {
    status: loadingStatus,
    items = [],
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage
  } = useIdentityListLogic()

  return (
    <>
      {[AUTHORIZER_IDENTITY_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}

      <TableContainer component={Paper}>
        <Table aria-label='accounts table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                <b>Applicant Type</b>
              </TableCell>
              <TableCell align='left'>
                <b>Date of Application</b>
              </TableCell>
              <TableCell align='left'>
                <b>Name</b>
              </TableCell>
              <TableCell align='left'>
                <b>Country Of Residence</b>
              </TableCell>
              <TableCell align='left'>
                <b>Status</b>
              </TableCell>
              <TableCell align='left'>
                <b>&nbsp;</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length ? (
              items.map(identity => (
                <IdentityListItem
                  key={identity._id}
                  identity={identity}
                  onClickView={onClickView}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan='5' align='center'>
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
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
    </>
  )
}

export default IdentityList

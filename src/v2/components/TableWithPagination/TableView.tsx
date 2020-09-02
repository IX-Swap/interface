import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableFooter,
  TableCell,
  LinearProgress,
  TablePagination
} from '@material-ui/core'
import { TableColumn, BaseFilter } from 'v2/types/util'
import { Actions } from 'v2/app/pages/authorizer/components/Actions'
import { useTableWithPagination } from 'v2/components/TableWithPagination/hooks/useTableWithPagination'
import { TableRows } from 'v2/components/TableWithPagination/TableRows'

export interface TableViewProps<T> {
  name: string
  uri: string
  columns: Array<TableColumn<T>>
  bordered?: boolean
  filter?: BaseFilter
  hasActions?: boolean
  actions?: Actions<T>
  children?: any
  fakeItems?: T[]
}

export const TableView = <T,>({
  name,
  uri,
  filter,
  columns = [],
  hasActions = false,
  bordered = true,
  actions,
  children,
  fakeItems
}: TableViewProps<T>): JSX.Element => {
  const {
    items,
    status,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    total
  } = useTableWithPagination<T>(name, uri, filter)

  return (
    <>
      {status === 'loading' && <LinearProgress />}
      <TableContainer>
        <Table aria-label='table' data-testid='table'>
          <TableHead>
            <TableRow>
              {columns.map(e => (
                <TableCell key={e.key} align={e.headAlign ?? 'left'}>
                  <b>{e.label}</b>
                </TableCell>
              ))}
              {hasActions && <TableCell />}
            </TableRow>
          </TableHead>
          <TableRows
            items={Array.isArray(fakeItems) ? fakeItems : items}
            bordered={bordered}
            name={name}
            uri={uri}
            columns={columns}
            hasActions={hasActions}
            actions={actions}
          >
            {children}
          </TableRows>
          {total > 0 && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={!bordered ? { borderBottom: 'none' } : {}}
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={columns.length + +hasActions}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangeRowsPerPage={evt => {
                    setPage(0)
                    setRowsPerPage(parseInt(evt.target.value))
                  }}
                  onChangePage={(evt, newPage: number) => {
                    setPage(newPage)
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  )
}

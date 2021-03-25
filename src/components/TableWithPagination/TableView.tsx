import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  LinearProgress,
  TablePagination,
  Paper,
  Grid,
  PaperProps
} from '@material-ui/core'
import { TableColumn, BaseFilter } from 'types/util'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { TableRows } from 'components/TableWithPagination/TableRows'
import { statusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'

export interface TableViewRendererProps<T> {
  items: T[]
  columns: Array<TableColumn<T>>
  hasActions: boolean
  actions?: Actions<T>
  cacheQueryKey: any
}

export interface TableViewProps<T> {
  name: string
  uri: string
  queryEnabled?: boolean
  columns: Array<TableColumn<T>>
  bordered?: boolean
  filter?: BaseFilter
  hasActions?: boolean
  hasStatus?: boolean
  actions?: Actions<T>
  children?: (props: TableViewRendererProps<T>) => JSX.Element
  fakeItems?: T[]
  innerRef?: any
  paperProps?: PaperProps
}

export const TableView = <T,>({
  name,
  uri,
  filter,
  queryEnabled = true,
  columns: columnsProp = [],
  hasActions = false,
  hasStatus = false,
  bordered = true,
  actions,
  children,
  fakeItems,
  innerRef,
  paperProps = {}
}: TableViewProps<T>): JSX.Element => {
  const {
    items,
    status,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    total
  } = useTableWithPagination<T>(name, uri, filter, queryEnabled)
  const cacheQueryKey = [name, page, rowsPerPage, filter]

  if (innerRef !== undefined) {
    innerRef.current = { refresh: () => setPage(page) }
  }

  const columns =
    hasStatus && filter?.status === ''
      ? [...columnsProp, statusColumn]
      : columnsProp

  return (
    <Grid container direction='column'>
      <Grid item>
        {status === 'loading' && <LinearProgress />}
        <Paper
          variant='outlined'
          style={{ backgroundColor: 'inherit' }}
          {...paperProps}
        >
          <TableContainer>
            <Table aria-label='table' data-testid='table'>
              {columns.length > 0 ? (
                <TableHead>
                  <TableRow>
                    {columns.map(e => (
                      <TableCell
                        key={e.key}
                        align={e.headAlign ?? 'left'}
                        style={{ borderBottom: 'none' }}
                      >
                        <b>{e.label}</b>
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell style={{ borderBottom: 'none' }} />
                    )}
                  </TableRow>
                </TableHead>
              ) : null}
              {typeof children === 'function' ? (
                children({
                  items: Array.isArray(fakeItems) ? fakeItems : items,
                  columns,
                  hasActions,
                  actions,
                  cacheQueryKey
                })
              ) : (
                <TableRows
                  items={Array.isArray(fakeItems) ? fakeItems : items}
                  bordered={bordered}
                  name={name}
                  uri={uri}
                  columns={columns}
                  hasActions={hasActions}
                  actions={actions}
                  cacheQueryKey={cacheQueryKey}
                />
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      {total > 0 && (
        <Grid item>
          <TablePagination
            component='div'
            style={{ width: '100%', borderBottom: 'none' }}
            rowsPerPageOptions={[5, 10, 25, 50]}
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
        </Grid>
      )}
    </Grid>
  )
}

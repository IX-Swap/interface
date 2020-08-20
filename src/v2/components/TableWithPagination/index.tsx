import React, { useEffect } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  LinearProgress
} from '@material-ui/core'
import { useObserver } from 'mobx-react'

import { init } from './context'
import Items from './items'
import { TableColumn, BaseFilter, RowAction } from '../../types/util'
import { GenericStatus } from '../../types/status'
import { Actions } from 'v2/app/authorizer/components/Actions'

interface ProgressProps<T> {
  name: string
  uri: string
}

export interface TableViewProps<T> extends ProgressProps<T> {
  name: string
  uri: string
  columns: Array<TableColumn<T>>
  bordered?: boolean
  filter?: BaseFilter
  hasActions?: boolean
  actions?: Actions<T>
  children?: any
}

const Progress = <T,>({ name, uri }: ProgressProps<T>) => {
  const { useStore: useTableStoreState } = init<T>(name, uri)
  const tableState = useTableStoreState()

  return useObserver(() =>
    [GenericStatus.Busy].includes(tableState.status) ? <LinearProgress /> : null
  )
}
Progress.whyDidYouRender = true

const GTableRows = <T,>({
  name,
  uri,
  columns,
  hasActions,
  actions,
  children
}: TableViewProps<T>) => {
  const { useStore: useTableStoreState } = init<T>(name, uri)
  const tableState = useTableStoreState()

  return useObserver(() =>
    children ? (
      children({ items: tableState.items, columns, hasActions, actions })
    ) : (
      <Items
        items={tableState.items}
        columns={columns}
        hasActions={hasActions}
        actions={actions}
      />
    )
  )
}
GTableRows.whyDidYouRender = true

const GTableFooter = <T,>({
  name,
  uri,
  columns,
  hasActions,
  bordered
}: TableViewProps<T>) => {
  const { useStore: useTableStoreState } = init<T>(name, uri)
  const tableState = useTableStoreState()

  return useObserver(() => {
    return (
      (tableState.total && (
        <TableFooter>
          <TableRow>
            <TablePagination
              style={!bordered ? { borderBottom: 'none' } : {}}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns.length + +!!hasActions}
              count={tableState.total}
              rowsPerPage={tableState.limit}
              page={tableState.page}
              onChangeRowsPerPage={evt =>
                tableState.setRowsPerPage(parseInt(evt.target.value))
              }
              onChangePage={(evt, newPage: number) => {
                tableState.setPage(newPage)
              }}
            />
          </TableRow>
        </TableFooter>
      )) ||
      null
    )
  })
}
GTableFooter.whyDidYouRender = true

const TableView = <T,>({
  name,
  uri,
  filter = { status: '' },
  columns = [],
  hasActions = false,
  bordered = true,
  actions,
  children
}: TableViewProps<T>) => {
  const { useStore: useTableStoreState } = init<T>(name, uri)
  const tableState = useTableStoreState()

  useEffect(() => {
    tableState.getItems(filter, tableState.skip, tableState.limit)
  }, [tableState, filter])

  return (
    <>
      <Progress<T> name={name} uri={uri} />
      <TableContainer>
        <Table aria-label='table'>
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
          <GTableRows
            bordered={bordered}
            name={name}
            uri={uri}
            columns={columns}
            hasActions={hasActions}
            actions={actions}
          >
            {children}
          </GTableRows>
          <GTableFooter
            bordered={bordered}
            name={name}
            uri={uri}
            columns={columns}
            hasActions={hasActions}
          />
        </Table>
      </TableContainer>
    </>
  )
}

export default TableView

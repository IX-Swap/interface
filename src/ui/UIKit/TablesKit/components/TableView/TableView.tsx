import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress
} from '@mui/material'
import { TableColumn, BaseFilter } from 'types/util'
import { ActionsType } from 'app/pages/authorizer/components/Actions'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { TableRows } from 'ui/UIKit/TablesKit/components/TableRows/TableRows'
import { statusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'
import { UseSelectionHelperReturnType } from 'hooks/useSelectionHelper'
import { NoData } from 'app/components/NoData/NoData'
import useStyles from 'ui/UIKit/TablesKit/components/TableView/TableView.styles'
import { TablePagination } from 'ui/Pagination/TablePagination'

export interface TableViewRendererProps<T> {
  items: T[]
  columns: Array<TableColumn<T>>
  hasActions: boolean
  actions?: ActionsType<T>
  cacheQueryKey: any
}
export interface RenderHeadCellArgs<T> {
  item?: TableColumn<T>
  content?: string
}
export interface TableViewProps<T> {
  name?: string
  uri?: string
  queryEnabled?: boolean
  columns: Array<TableColumn<T>>
  bordered?: boolean
  filter?: BaseFilter
  hasStatus?: boolean
  actions?: ActionsType<T>
  children?: (props: TableViewRendererProps<T>) => JSX.Element
  fakeItems?: T[]
  fakeLoading?: boolean
  innerRef?: any
  selectionHelper?: UseSelectionHelperReturnType<T | unknown>
  defaultRowsPerPage?: number
  size?: 'small' | 'medium'
  noDataComponent?: JSX.Element
  actionHeader?: string
}

export const TableView = <T,>({
  name,
  uri,
  filter,
  queryEnabled = true,
  columns: columnsProp = [],
  hasStatus = false,
  bordered = true,
  actions,
  children,
  fakeItems,
  fakeLoading = false,
  innerRef,
  selectionHelper,
  defaultRowsPerPage,
  size = 'medium',
  noDataComponent = <NoData title='No Data' />,
  actionHeader = ''
}: TableViewProps<T>): JSX.Element => {
  const hasActions = actions !== undefined
  const {
    items,
    status,
    isLoading,
    page,
    setPage,
    setRowsPerPage,
    rowsPerPage,
    total
  } = useTableWithPagination<T>({
    uri: uri,
    queryKey: name,
    defaultFilter: filter,
    queryEnabled: queryEnabled,
    defaultRowsPerPage: defaultRowsPerPage
  })

  const classes = useStyles()
  const cacheQueryKey = [name, page, rowsPerPage, filter]

  const _items = Array.isArray(fakeItems) ? fakeItems : items

  if (innerRef !== undefined) {
    innerRef.current = { refresh: () => setPage(page) }
  }

  let columns = hasStatus ? [...columnsProp, statusColumn] : columnsProp

  if (selectionHelper !== undefined) {
    const {
      getIsItemSelected,
      getIsItemsSelected,
      getIsIndeterminate,
      toggle,
      toggleAll
    } = selectionHelper

    const firstColumnRender = columns[0].render

    columns = [
      {
        ...columns[0],
        label: (
          <FormControlLabel
            control={
              <Checkbox
                checked={getIsItemsSelected(_items)}
                indeterminate={getIsIndeterminate(_items)}
                onClick={() => toggleAll(_items)}
                className={classes.checkbox}
              />
            }
            label={<b>{columns[0].label}</b>}
            labelPlacement={'end'}
          />
        ),
        render: (val: any, item: T) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={getIsItemSelected(item)}
                onClick={() => toggle(item)}
              />
            }
            label={firstColumnRender?.(val, item) ?? val ?? ''}
            labelPlacement={'end'}
          />
        )
      },
      ...columns.filter(col => col.label !== columns[0].label)
    ]
  }

  const renderHeadCell = ({ item, content }: RenderHeadCellArgs<T>) => (
    <TableCell
      key={item?.key}
      className={classes.headCell}
      align={item?.headAlign ?? 'left'}
    >
      <Typography variant={'body2'} className={classes.headText}>
        {item?.label ?? content}
      </Typography>
    </TableCell>
  )

  const renderTableLoading = () => {
    if (status === 'loading' || fakeLoading) {
      return (
        <>
          <Box className={classes.loading}>
            <CircularProgress />
          </Box>
        </>
      )
    }
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        {renderTableLoading()}
        <Paper style={{ backgroundColor: 'inherit' }}>
          <TableContainer style={{ overflow: 'visible' }}>
            <Table aria-label='table' data-testid='table' size={size}>
              {columns.length > 0 ? (
                <TableHead>
                  <TableRow>
                    {columns.map(e => renderHeadCell({ item: e }))}
                    {hasActions && renderHeadCell({ content: actionHeader })}
                  </TableRow>
                </TableHead>
              ) : null}
              {typeof children === 'function' ? (
                children({
                  items: _items,
                  columns,
                  hasActions,
                  actions,
                  cacheQueryKey
                })
              ) : (
                <TableRows
                  items={_items}
                  bordered={bordered}
                  name={name}
                  size={size}
                  columns={columns}
                  hasActions={hasActions}
                  actions={actions}
                  cacheQueryKey={cacheQueryKey}
                  isLoading={isLoading}
                  noDataComponent={noDataComponent}
                />
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      {total > 0 && (
        <Grid
          item
          container
          justifyContent={'flex-end'}
          className={classes.paginationContainer}
        >
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={columns.length + +hasActions}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              classes={{ toolbar: classes.toolbar }}
              onRowsPerPageChange={evt => {
                setPage(0)
                setRowsPerPage(parseInt(evt.target.value))
              }}
              onPageChange={(evt, newPage: number) => {
                setPage(newPage)
              }}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

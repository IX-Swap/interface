import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Grid,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress,
  PaperProps,
  TableSortLabel
} from '@mui/material'
import { TableColumn, BaseFilter } from 'types/util'
import { ActionsType } from 'app/pages/authorizer/components/Actions'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { TableRows } from 'ui/UIKit/TablesKit/components/TableRows/TableRows'
import {
  statusColumn,
  statusColumnWithActions
} from 'app/pages/authorizer/hooks/useAuthorizerView'
import { UICheckbox } from 'components/UICheckbox/UICheckbox'
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
  columns: Array<TableColumn<T>> | any
  compactColumns?: Array<TableColumn<T>> | any
  bordered?: boolean
  filter?: BaseFilter
  hasStatusWithActions?: boolean
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
  noHeader?: boolean
  method?: 'POST' | 'GET'
  paginationPlacement?: 'top' | 'bottom' | 'both' | 'none'
  labelRowsPerPage?: React.ReactNode
  activeSortLabel?: string
  paperProps?: PaperProps
  limitRows?: number
}

export const TableView = <T,>({
  name,
  uri,
  filter,
  queryEnabled = true,
  columns: columnsProp = [],
  hasStatusWithActions = false,
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
  actionHeader = '',
  noHeader = false,
  method = 'POST',
  paginationPlacement = 'bottom',
  labelRowsPerPage,
  activeSortLabel,
  paperProps,
  limitRows = 0
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
    total,
    sortOrder,
    sortField,
    setSortOrder,
    setSortField
  } = useTableWithPagination<T>({
    uri: uri,
    queryKey: name,
    defaultFilter: filter,
    queryEnabled: queryEnabled,
    defaultRowsPerPage: defaultRowsPerPage,
    method
  })

  const classes = useStyles()
  const cacheQueryKey = [name, page, rowsPerPage, filter]

  const _items = Array.isArray(fakeItems) ? fakeItems : items

  if (innerRef !== undefined) {
    innerRef.current = { refresh: () => setPage(page) }
  }
  const headDisplay = noHeader ? 'none' : 'table-header-group'
  let columns = columnsProp

  if (hasStatus) columns = [...columns, statusColumn]
  if (hasStatusWithActions) columns = [...columns, statusColumnWithActions]

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
              <UICheckbox
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
              <UICheckbox
                checked={getIsItemSelected(item)}
                onClick={() => toggle(item)}
              />
            }
            label={firstColumnRender?.(val, item) ?? val ?? ''}
            labelPlacement={'end'}
          />
        )
      },
      ...columns.filter((col: any) => col.label !== columns[0].label)
    ]
  }

  const handleSort = (column: string) => {
    const isAsc = sortField === column && sortOrder === 'asc'
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortField(column)
  }

  const renderHeadCell = ({ item, content }: RenderHeadCellArgs<T>) => (
    <TableCell
      key={item?.key}
      className={classes.headCell}
      align={item?.headAlign ?? 'left'}
    >
      <TableSortLabel
        active={sortField === item?.key}
        direction={
          sortField === item?.key
            ? (sortOrder as 'desc' | 'asc' | undefined)
            : 'asc'
        }
        onClick={() => handleSort(item !== undefined ? item?.key : 'createdAt')}
      >
        <Typography variant={'body2'} className={classes.headText}>
          {item?.label ?? content}
        </Typography>
      </TableSortLabel>
    </TableCell>
  )

  const renderPagination = () => {
    if (total > 0) {
      return (
        <Grid
          item
          container
          justifyContent={'flex-end'}
          className={classes.paginationContainer}
        >
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              colSpan={columns.length + +hasActions}
              count={total}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
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
      )
    }
  }

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
      {['top', 'both'].includes(paginationPlacement) && renderPagination()}
      <Grid item zIndex={2}>
        {renderTableLoading()}
        <Paper style={{ backgroundColor: 'inherit' }} {...paperProps}>
          <TableContainer style={{ overflow: 'visible' }}>
            <Table aria-label='table' data-testid='table' size={size}>
              {columns.length > 0 ? (
                <TableHead
                  style={{
                    display: headDisplay
                  }}
                >
                  <TableRow>
                    {columns.map((e: any) => renderHeadCell({ item: e }))}
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
                  items={limitRows === 0 ? _items : _items.slice(0, limitRows)}
                  bordered={bordered}
                  name={name}
                  size={size}
                  columns={columns}
                  hasActions={hasActions}
                  actions={actions}
                  cacheQueryKey={cacheQueryKey}
                  isLoading={isLoading}
                  activeSortLabel={activeSortLabel}
                  noDataComponent={noDataComponent}
                />
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      {limitRows === 0 &&
        ['bottom', 'both'].includes(paginationPlacement) &&
        renderPagination()}
    </Grid>
  )
}

import { Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import get from 'lodash/get'
import React from 'react'
import { Serialized } from 'types/base'
import { TableColumn } from 'types/util'
import { useStyles } from 'ui/CompactTable/CompactTable.styles'
import { TableViewRendererProps } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { ExpandButton } from './ExpandButton'

export interface CompactBodyProps<T extends Serialized>
  extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
  renderActionButton?: (item: T) => JSX.Element | null
  menu?: React.ReactElement
}

export interface RenderCellProps<T extends Serialized>
  extends TableColumn<T, string> {
  item: T
}
export const renderCell = <T extends Serialized>({
  render,
  key,
  item
}: RenderCellProps<T>) => {
  return (
    key.length > 0 &&
    (typeof render === 'function'
      ? render(get(item, key), item)
      : get(item, key))
  )
}

export const CompactTable = <T extends Serialized>(
  props: CompactBodyProps<T>
) => {
  const { columns, items, menu, renderActionButton } = props
  const classes = useStyles()

  return (
    <>
      <TableBody>
        {items.map((item, i) => (
          <TableRow key={i}>
            <TableCell className={classes.cell}>
              <Grid
                container
                flexDirection='row'
                rowGap={3}
                className={classes.card}
              >
                <Grid
                  item
                  container
                  rowGap={1}
                  className={classes.columns}
                  xs={12}
                >
                  {columns.map(({ label, key, render }, _index) => (
                    <Grid
                      item
                      container
                      key={key}
                      flexDirection='row'
                      rowGap={1}
                    >
                      <Grid item xs={12} className={classes.label}>
                        {label}
                      </Grid>
                      <Grid item xs={12} className={classes.value}>
                        {renderCell({ render, key, item, label })}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                {renderActionButton !== undefined ? (
                  renderActionButton(item)
                ) : (
                  <ExpandButton item={item} />
                )}
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {menu !== undefined ? menu : null}
    </>
  )
}

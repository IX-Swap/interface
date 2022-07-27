import { Button, Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { useStyles } from 'ui/CompactTable/CompactTable.styles'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { Serialized } from 'types/base'
import { TableColumn } from 'types/util'
import { Icon } from 'ui/Icons/Icon'
import { TableViewRendererProps } from 'ui/UIKit/TablesKit/components/TableView/TableView'

export interface CompactBodyProps<T extends Serialized>
  extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
  menu: React.ReactElement
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
  const { columns, items, menu } = props
  const classes = useStyles()
  const context = useContext(ActiveElementContext)
  const handleClick = (item: T) => {
    context?.toggleRow(item._id)
  }

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
                  {columns.map(({ label, key, render }, index) => (
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
                <Grid item xs={12}>
                  <Button
                    onClick={() => handleClick(item)}
                    fullWidth
                    className={classes.iconButton}
                  >
                    <Icon name='more-horizontal' />
                  </Button>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {menu}
    </>
  )
}

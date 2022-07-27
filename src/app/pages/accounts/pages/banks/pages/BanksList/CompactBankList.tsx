import { Button, Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/BanksList/CompactBankList.styles'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { Bank } from 'types/bank'
import { TableColumn } from 'types/util'
import { Icon } from 'ui/Icons/Icon'
import { MobileMenu } from './MobileMenu'

export interface CompactBodyProps<T> extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
}

export interface RenderCellProps extends TableColumn<Bank, string> {
  item: Bank
}
export const renderCell = ({ render, key, item }: RenderCellProps) => {
  return (
    key.length > 0 &&
    (typeof render === 'function'
      ? render(get(item, key), item)
      : get(item, key))
  )
}

export const CompactBankList = (props: CompactBodyProps<Bank>) => {
  const { columns, items } = props
  const classes = useStyles()
  const context = useContext(ActiveElementContext)
  const handleClick = (item: Bank) => {
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
      <MobileMenu items={items} />
    </>
  )
}

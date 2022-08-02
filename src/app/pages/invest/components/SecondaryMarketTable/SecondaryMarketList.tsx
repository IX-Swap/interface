import { Button, Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { useStyles } from './SecondaryMarketList.styles'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import get from 'lodash/get'
import React, { useContext } from 'react'
import { TableColumn } from 'types/util'
import { Icon } from 'ui/Icons/Icon'
import { TableViewRendererProps } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { MobileMenu } from 'app/pages/invest/components/SecondaryMarketTable/MobileMenu'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { useQueryCache } from 'react-query'

export interface CompactBodyProps<T> extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
}

export interface RenderCellProps extends TableColumn<any, string> {
  item: any
}

export const renderCell = ({ render, key, item }: RenderCellProps) => {
  return (
    key.length > 0 &&
    (typeof render === 'function'
      ? render(get(item, key), item)
      : get(item, key))
  )
}

export const SecondaryMarketList = (props: CompactBodyProps<any>) => {
  const queryCache = useQueryCache()
  const { columns, items, cacheQueryKey } = props

  const classes = useStyles()
  const context = useContext(ActiveElementContext)

  const onButtonClick = (item: any) => {
    context?.toggleRow(item._id)
  }

  if (
    queryCache.watchQuery(cacheQueryKey).getCurrentResult().status === 'loading'
  ) {
    return null
  }

  if (items.length < 1) {
    return <NoOffers />
  }

  const renderColumnsBlock = (
    columns: any[],
    item: any,
    fullWidth: boolean = false
  ) => {
    return (
      <Grid
        item
        container
        rowGap={1}
        className={fullWidth ? classes.additionalColumns : classes.columns}
        xs={12}
      >
        {columns.map(({ label, key, render }) => (
          <Grid item container key={key} flexDirection='row' rowGap={1}>
            <Grid item xs={12} className={classes.label}>
              {label}
            </Grid>
            <Grid item xs={12} className={classes.value}>
              {renderCell({ render, key, item, label })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
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
                {renderColumnsBlock(columns.slice(0, 2), item)}
                {renderColumnsBlock(columns.slice(2, 4), item, true)}
                {renderColumnsBlock(columns.slice(4, columns.length), item)}
                <Grid item xs={12}>
                  <Button
                    onClick={() => onButtonClick(item)}
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

import { Box, Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getExpiresOrderMessage } from 'helpers/dates'
import get from 'lodash/get'
import React from 'react'
import { OTCOrder } from 'types/otcOrder'
import { needsConfirmation, useOpenOrderState } from './helpers'
import { OpenOrdersEmptyState } from './OpenOrdersEmptyState'
import { OTCOrderActionsMobile } from './OTCOrderActionsMobile'

export interface CompactBodyProps<T> extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
}

export const CompactOpenOTCOrder = (props: CompactBodyProps<OTCOrder>) => {
  const { columns, items } = props
  const { showEmptyState, rowColor } = useOpenOrderState(props)

  const classes = useStyles()
  if (showEmptyState) {
    return <OpenOrdersEmptyState />
  }
  return (
    <TableBody>
      {items.map((item, i) => (
        <TableRow
          key={i}
          style={{
            backgroundColor: rowColor(item)
          }}
        >
          <TableCell>
            <Grid container spacing={1} alignItems='flex-start'>
              {columns.map(({ label, key, render }, index) =>
                index === 0 ? (
                  <React.Fragment key={key}>
                    <Grid item container justifyContent='space-between'>
                      <Grid item>
                        {key.length > 0 &&
                          (typeof render === 'function'
                            ? render(get(item, key), item)
                            : get(item, key))}
                      </Grid>
                      <Grid item>
                        <OTCOrderActionsMobile item={item} type='Cancel' />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={key}>
                    <Grid item xs={6}>
                      {label}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ textAlign: 'right', fontWeight: 600 }}
                    >
                      {key.length > 0 &&
                        (typeof render === 'function'
                          ? render(get(item, key), item)
                          : get(item, key))}
                    </Grid>
                  </React.Fragment>
                )
              )}
              {needsConfirmation(item) && (
                <Grid
                  item
                  xs={12}
                  key={`${item._id}-timeout`}
                  style={{
                    backgroundColor: rowColor(item),
                    textAlign: 'center'
                  }}
                >
                  <Box className={classes.infoCell}>
                    <Box className={classes.separator} />
                    {getExpiresOrderMessage(new Date(item.createdAt))}
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <OTCOrderActionsMobile item={item} type='Confirm' />
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

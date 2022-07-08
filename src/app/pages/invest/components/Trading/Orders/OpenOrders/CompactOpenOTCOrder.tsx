import { Box, Grid, TableBody, TableCell, TableRow } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrders.styles'
import { CompactRowProps } from 'components/TableWithPagination/CompactRow'
import { TableViewRendererProps } from 'components/TableWithPagination/TableView'
import { getExpiresOrderMessage } from 'helpers/dates'
import get from 'lodash/get'
import React from 'react'
import {
  needsConfirmation,
  sortOpenOrders,
  useOpenOrderState,
  hasMatches,
  hasApprovedMatches
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { OpenOrdersEmptyState } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OpenOrdersEmptyState'
import { OTCOrderActionsMobile } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActionsMobile'
import { ToggleDetailsButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ToggleDetailsButton'
import { MobileNestedOrders } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders'
import { OpenOTCOrder } from 'types/otcOrder'
import { TableColumn } from 'types/util'
import { useAppTheme } from 'hooks/useAppTheme'

export interface CompactBodyProps<T> extends TableViewRendererProps<T> {
  renderRow?: (props: CompactRowProps<T>) => JSX.Element
}

export interface RenderCellProps extends TableColumn<OpenOTCOrder, string> {
  item: OpenOTCOrder
}
export const renderCell = ({ render, key, item }: RenderCellProps) => {
  return (
    key.length > 0 &&
    (typeof render === 'function'
      ? render(get(item, key), item)
      : get(item, key))
  )
}

export const CompactOpenOTCOrder = (props: CompactBodyProps<OpenOTCOrder>) => {
  const { columns, items } = props
  const { showEmptyState, mobileRowColor } = useOpenOrderState(props)
  const classes = useStyles()
  const { theme } = useAppTheme()
  if (showEmptyState) {
    return <OpenOrdersEmptyState />
  }
  const sorted = [...items]?.sort(sortOpenOrders) ?? []

  return (
    <>
      <TableBody>
        {sorted.map((item, i) => (
          <TableRow
            key={i}
            style={{
              backgroundColor: mobileRowColor(item),
              borderBottom: `12px solid ${
                theme.palette.background.paper ?? 'white'
              }`
            }}
          >
            <TableCell>
              <Grid container spacing={1} alignItems='flex-start'>
                {columns.map(({ label, key, render }, index) =>
                  index === 0 ? (
                    <React.Fragment key={key}>
                      <Grid item container justifyContent='space-between'>
                        <Grid item>
                          {renderCell({ render, key, item, label })}
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
                        style={{ textAlign: 'right', fontWeight: 400 }}
                      >
                        {renderCell({ render, key, item, label })}
                      </Grid>
                    </React.Fragment>
                  )
                )}
                {needsConfirmation(item) && (
                  <>
                    {hasApprovedMatches(item) && (
                      <Grid
                        item
                        xs={12}
                        key={`${item._id ?? ''}-timeout`}
                        style={{
                          backgroundColor: mobileRowColor(item),
                          textAlign: 'center'
                        }}
                      >
                        <Box className={classes.infoCell}>
                          <Box className={classes.separator} />
                          {getExpiresOrderMessage(new Date(item.createdAt))}
                        </Box>
                      </Grid>
                    )}

                    {hasMatches(item) && (
                      <Grid item xs={12}>
                        <ToggleDetailsButton item={item} />
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <MobileNestedOrders items={sorted} />
    </>
  )
}

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { getColumnMatchedOrder } from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { MobileConfirmationMessage } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'
import { ConfirmOTCOrderActions } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions'
import { ToggleDetailsButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ToggleDetailsButton'
import { renderTotal } from 'helpers/numbers'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useContext, useMemo } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'

export const MobileNestedOrders = ({ items }: { items: OpenOTCOrder[] }) => {
  const context = useContext(OpenOrdersContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex
  const { isMobile } = useAppBreakpoints()

  const selectedItem = useMemo(
    () => items.filter(item => item._id === openIndex)?.[0],
    [openIndex, items]
  )
  if (selectedItem === undefined) {
    return null
  }
  const onClose = () => {
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }
  const matches = selectedItem.matches ?? []
  return (
    <>
      {isMobile && (
        <Drawer
          anchor='bottom'
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
          <Box className={classes.drawer}>
            <Box className={classes.close}>
              <IconButton onClick={onClose} size='small'>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid flexDirection='column'>
              <Box>
                <Typography
                  className={classes.header}
                  variant='subtitle2'
                  fontWeight={600}
                >
                  {selectedItem.pair.name}
                </Typography>
              </Box>
              <Box className={classes.separator} />
              <Grid display='flex' flexDirection={'column'} gap={2}>
                {matches?.map(item => (
                  <Box
                    display={'flex'}
                    className={classes.rowBox}
                    data-testId='matches-nested-mobile'
                  >
                    <Table>
                      <TableBody>
                        <TableRow
                          key={`${item._id}-head`}
                          className={classes.tableRow}
                        >
                          <TableCell
                            key={`${item._id}-amount-head`}
                            className={classes.headerCell}
                          >
                            <Typography variant={'subtitle2'}>
                              Amount
                            </Typography>
                          </TableCell>

                          <TableCell
                            key={`${item._id}-price-head`}
                            className={classes.headerCell}
                          >
                            <Typography variant={'subtitle2'}>Price</Typography>
                          </TableCell>
                          <TableCell
                            key={`${item._id}-total-head`}
                            className={classes.headerCell}
                          >
                            <Typography variant={'subtitle2'}>Total</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={`${item._id}-data`}>
                          <TableCell
                            key={`${item._id}-amount-data`}
                            className={classes.dataCell}
                          >
                            {item.matchedAmount}
                          </TableCell>
                          <TableCell
                            key={`${item._id}-price-data`}
                            className={classes.dataCell}
                          >
                            {item.matchedPrice}
                          </TableCell>
                          <TableCell
                            key={`${item._id}-total-data`}
                            className={classes.dataCell}
                          >
                            {renderTotal({
                              price: item.matchedPrice,
                              amount: item.matchedAmount,
                              row: selectedItem
                            })}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <ConfirmOTCOrderActions
                      item={getColumnMatchedOrder(selectedItem, item)}
                    />
                  </Box>
                ))}
              </Grid>
              <MobileConfirmationMessage item={selectedItem} color='initial' />
              <Box mb={2} />
              <ToggleDetailsButton item={selectedItem} />
            </Grid>
          </Box>
        </Drawer>
      )}
    </>
  )
}

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { getColumnMatchedOrder } from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'
import { renderTotal } from 'helpers/numbers'
import React, { useContext, useMemo } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { MobileConfirmationMessage } from './MobileConfirmationMessage'
import { ConfirmOTCOrderActions } from './OTCOrderActions'
import { ToggleDetailsButton } from './ToggleDetailsButton'

export const MobileNestedOrders = ({ items }: { items: OpenOTCOrder[] }) => {
  const context = useContext(OpenOrdersContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex
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
  return (
    <Hidden mdUp>
      <Drawer anchor='bottom' open={open} onClose={onClose}>
        <Box className={classes.drawer}>
          <Box className={classes.close}>
            <IconButton onClick={onClose} size='large'>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid flexDirection='column'>
            <Box>
              <Typography className={classes.header} variant='subtitle2'>
                {selectedItem.pair.name}
              </Typography>
            </Box>
            {selectedItem.matches?.map(item => (
              <Box display={'flex'}>
                <Table>
                  <TableBody>
                    <TableRow key={`${item._id}-head`}>
                      <TableCell key={`${item._id}-amount-head`}>
                        Amount
                      </TableCell>
                      <TableCell key={`${item._id}-price-head`}>
                        Price
                      </TableCell>
                      <TableCell key={`${item._id}-total-head`}>
                        Total
                      </TableCell>
                    </TableRow>
                    <TableRow key={`${item._id}-data`}>
                      <TableCell key={`${item._id}-amount-data`}>
                        {item.matchedAmount}
                      </TableCell>
                      <TableCell key={`${item._id}-price-data`}>
                        {item.matchedPrice}
                      </TableCell>
                      <TableCell key={`${item._id}-total-data`}>
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
            <MobileConfirmationMessage item={selectedItem} color='initial' />
            <Box mb={2} />
            <ToggleDetailsButton item={selectedItem} />
          </Grid>
        </Box>
      </Drawer>
    </Hidden>
  )
}

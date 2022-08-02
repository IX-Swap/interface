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
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { getColumnMatchedOrder } from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { MobileConfirmationMessage } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'
import { ConfirmOTCOrderActions } from 'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions'
import { ToggleDetailsButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ToggleDetailsButton'
import { LeavePageContext } from 'app/pages/issuance/context/LeavePageContext'
import { renderTotal } from 'helpers/numbers'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useContext, useMemo } from 'react'
import { OpenOTCOrder, OTCMatch } from 'types/otcOrder'
import { Icon } from 'ui/Icons/Icon'

export const MobileNestedOrders = ({ items }: { items: OpenOTCOrder[] }) => {
  const context = useContext(ActiveElementContext)
  const leavePageContext = useContext(LeavePageContext)
  const open = context?.hasOpenIndices
  const classes = useStyles()
  const openIndex = context?.openIndex
  const { isTablet } = useAppBreakpoints()

  const selectedItem = useMemo(
    () => items.filter(item => item._id === openIndex)?.[0],
    [openIndex, items]
  )
  if (selectedItem === undefined) {
    return null
  }
  const onClose = () => {
    if (leavePageContext?.showPrompt === true) {
      return
    }
    if (openIndex !== undefined) {
      context?.toggleRow(openIndex)
    }
  }
  const matches = selectedItem.matches ?? []
  return (
    <>
      {isTablet && (
        <Drawer
          anchor='bottom'
          open={open}
          onClose={onClose}
          PaperProps={{ sx: { backgroundColor: 'transparent' } }}
        >
          <Box className={classes.drawer}>
            <Box className={classes.close}>
              <IconButton onClick={onClose} size='small'>
                <Icon name='close' />
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
                {matches?.map((item: OTCMatch) => (
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

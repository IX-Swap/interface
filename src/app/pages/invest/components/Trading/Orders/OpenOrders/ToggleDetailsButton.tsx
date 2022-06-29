import { Box, Button, ButtonProps } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrder.styles'
import React, { useContext } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'

export interface ToggleDetailsButtonProps extends ButtonProps {
  item: OpenOTCOrder
}
export const ToggleDetailsButton = ({
  item,
  ...rest
}: ToggleDetailsButtonProps) => {
  const context = useContext(OpenOrdersContext)
  const classes = useStyles()
  const isOpen = context?.isIndexOpen(item._id) === true
  const onClick = () => {
    context?.toggleRow(item._id)
  }
  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      <Button
        onClick={onClick}
        variant='outlined'
        color='primary'
        size='large'
        className={classes.toggleButton}
        {...rest}
      >
        {isOpen ? 'Hide details' : 'Show details'}
      </Button>
    </Box>
  )
}

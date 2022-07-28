import { Box, Button, ButtonProps } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CancelOTCOrder.styles'
import React, { useContext } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'

export interface ToggleDetailsButtonProps extends ButtonProps {
  item: OpenOTCOrder
}
export const ToggleDetailsButton = ({
  item,
  ...rest
}: ToggleDetailsButtonProps) => {
  const context = useContext(ActiveElementContext)
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

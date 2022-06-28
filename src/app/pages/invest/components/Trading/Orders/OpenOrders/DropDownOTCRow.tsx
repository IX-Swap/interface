import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
export interface DropDownOTCRowProps {
  order: OpenOTCOrder
}

export const DropDownOTCRow = ({ order }: DropDownOTCRowProps) => {
  const context = useContext(OpenOrdersContext)
  const isOpen = context?.isIndexOpen?.(order._id)
  const handleClick = () => {
    context?.toggleRow(order._id)
  }

  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      <IconButton data-testid='more-button' size='small' onClick={handleClick}>
        {isOpen !== true && <ArrowDropDown color='primary' />}
        {isOpen === true && <ArrowDropUp color='primary' />}
      </IconButton>
    </Box>
  )
}

import { Box, IconButton } from '@mui/material'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import React, { useContext } from 'react'
import { OpenOTCOrder } from 'types/otcOrder'
import { Icon } from 'ui/Icons/Icon'
export interface DropDownOTCRowProps {
  order: OpenOTCOrder
}

export const DropDownOTCRow = ({ order }: DropDownOTCRowProps) => {
  const context = useContext(ActiveElementContext)
  const isOpen = context?.isIndexOpen?.(order._id)
  const handleClick = () => {
    context?.toggleRow(order._id)
  }
  const iconName = isOpen === true ? 'chevron-up' : 'chevron-down'
  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      <IconButton data-testid='more-button' size='small' onClick={handleClick}>
        <Icon name={iconName} />
      </IconButton>
    </Box>
  )
}

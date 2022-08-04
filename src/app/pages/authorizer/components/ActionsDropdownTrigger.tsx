import { Box, CircularProgress } from '@mui/material'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface ActionsDropdownTriggerProps extends DropdownTriggerProps {
  isLoading: boolean
}

export const ActionsDropdownTrigger = (props: ActionsDropdownTriggerProps) => {
  const { isLoading, triggerProps } = props

  if (isLoading) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        style={{ width: 25, height: 25 }}
      >
        <CircularProgress thickness={5.5} size={16} />
      </Box>
    )
  }

  return (
    <Box
      {...triggerProps}
      data-testid='more-button'
      style={{ cursor: 'pointer', padding: 5 }}
    >
      <Icon name='more-vertical' size={24} />
    </Box>
  )
}

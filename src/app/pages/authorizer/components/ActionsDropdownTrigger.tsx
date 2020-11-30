import React from 'react'
import { DropdownTriggerProps } from 'app/components/Dropdown/Dropdown'
import { Box, CircularProgress, IconButton } from '@material-ui/core'
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons'

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
    <IconButton {...triggerProps} data-testid='more-button' size='small'>
      <MoreHorizIcon color='disabled' />
    </IconButton>
  )
}

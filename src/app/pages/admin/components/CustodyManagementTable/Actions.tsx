import React from 'react'
import {
  Launch as LaunchIcon,
  LinkOff as LinkOffIcon
} from '@material-ui/icons'
import { Box, IconButton } from '@material-ui/core'
import { CustodyAccountsListItem } from 'types/custodyAccount'

export interface ActionsProps {
  item: CustodyAccountsListItem
  onLaunchButtonClick: (item: CustodyAccountsListItem) => void
  onLinkOffButtonClick: (item: CustodyAccountsListItem) => void
}

export const Actions = ({
  item,
  onLaunchButtonClick,
  onLinkOffButtonClick
}: ActionsProps) => {
  const handleLaunchButtonClick = () => {
    onLaunchButtonClick(item)
  }

  const handleLinkOffButtonClick = () => {
    onLinkOffButtonClick(item)
  }

  return (
    <Box display={'flex'} justifyContent={'space-around'}>
      <IconButton size='small' onClick={handleLaunchButtonClick}>
        <LaunchIcon color='disabled' />
      </IconButton>
      <IconButton size='small' onClick={handleLinkOffButtonClick}>
        <LinkOffIcon color='disabled' />
      </IconButton>
    </Box>
  )
}

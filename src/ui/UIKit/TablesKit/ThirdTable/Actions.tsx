import React from 'react'
import { Box, IconButton } from '@mui/material'
import { ThirdTableItem } from 'ui/UIKit/TablesKit/ThirdTable/ThirdTable'
import { Icon } from 'ui/Icons/Icon'

export interface ActionsProps {
  item: ThirdTableItem
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
      <IconButton>
        <Icon name={'more-horizontal'} />
      </IconButton>
    </Box>
  )
}

import React from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import { SecondTableItem } from 'ui/UIKit/TablesKit/SecondTable/SecondTable'

export interface ActionsProps {
  item: SecondTableItem
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
      {item.symbol === 'PPC' || item.symbol === 'NX' ? (
        <Button
          style={{ marginRight: 16 }}
          variant={item.symbol === 'PPC' ? 'outlined' : 'contained'}
        >
          Trade
        </Button>
      ) : null}
      <IconButton>
        <Icon name={'more-horizontal'} />
      </IconButton>
    </Box>
  )
}

import React from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import { FirstTableItem } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'

export interface ActionsProps {
  item: FirstTableItem
}

export const Actions = ({ item }: ActionsProps) => {
  const styles = { height: 33, marginRight: 8 }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
      <Button style={styles} variant={'outlined'}>
        + Deposit
      </Button>
      <Button style={styles} variant={'outlined'}>
        Invest Primary
      </Button>
      <Button style={styles} variant={'outlined'}>
        Invest Secondary
      </Button>
      {/* <Button style={styles} variant={'outlined'}> */}
      {/*  Withdraw */}
      {/* </Button> */}
      <IconButton>
        <Icon name={'more-horizontal'} />
      </IconButton>
    </Box>
  )
}

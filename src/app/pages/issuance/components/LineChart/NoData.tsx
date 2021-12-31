import { Box, Typography } from '@material-ui/core'
import React from 'react'
import EmptyBox from 'assets/icons/empty-box.svg'
import { VSpacer } from 'components/VSpacer'

export const NoData = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      height={400}
    >
      <EmptyBox />
      <VSpacer size='small' />
      <Typography align='center' variant='body1'>
        There is no investment at the moment. Once you receive investments in
        your deal you will be able to see the charts.
      </Typography>
    </Box>
  )
}

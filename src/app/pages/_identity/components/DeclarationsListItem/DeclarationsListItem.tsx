import React from 'react'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import { Box, Grid, Typography } from '@material-ui/core'

export interface DeclarationsListItemProps {
  label: string
  value: boolean
}

export const DeclarationsListItem = ({
  label,
  value
}: DeclarationsListItemProps) => {
  return (
    <Grid item xs={12}>
      <Box display={'flex'} alignItems={'center'} color={'#AAAAAA'}>
        {value ? <DoneIcon /> : <CloseIcon />}
        <Typography>
          <Box marginLeft={2} color={'#444444'}>
            {label}
          </Box>
        </Typography>
      </Box>
    </Grid>
  )
}

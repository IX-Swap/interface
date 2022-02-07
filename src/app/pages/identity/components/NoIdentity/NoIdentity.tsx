import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

export interface NoIdentityProps {
  text: string
}

export const NoIdentity: React.FC<NoIdentityProps> = props => {
  const { text } = props

  return (
    <Grid container>
      <Box px={1} py={3}>
        <Typography>{text}</Typography>
      </Box>
    </Grid>
  )
}

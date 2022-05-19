import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'

export const DialogText: React.FC = () => {
  const theme = useTheme()
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography
          color={theme.palette.text.secondary}
          variant='subtitle2'
          align='center'
          fontWeight={500}
        >
          Would you like to have it?
        </Typography>
      </Grid>
    </Grid>
  )
}

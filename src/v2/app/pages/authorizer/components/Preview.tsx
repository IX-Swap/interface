import React from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

export interface PreviewProps {
  onBack: () => void
}

export const Preview: React.FC<PreviewProps> = ({ children, onBack }) => {
  return (
    <Grid container spacing={4} direction='column'>
      <Grid item container xs={12} alignItems='center' style={{ flex: '0' }}>
        <IconButton onClick={onBack} data-testid='back-button'>
          <ChevronLeftIcon fontSize='inherit' />
        </IconButton>
        <Typography variant='h3'>Preview</Typography>
      </Grid>
      <Grid container item xs={12} style={{ flex: '0' }} justify='center'>
        {children}
      </Grid>
    </Grid>
  )
}

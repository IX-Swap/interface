import { Button, ButtonProps, Grid, Typography } from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { ReactComponent as SingpassLogo } from 'assets/singpass-logo.svg'

export const SingPassButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      type='button'
      variant='contained'
      endIcon={<Icon name='chevron-right' color='#FFF' />}
      sx={{
        width: '100%',
        textAlign: 'left',
        paddingTop: '20px',
        paddingBottom: '20px',
        height: 'auto'
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <SingpassLogo />
        </Grid>
        <Grid data-testid='singpass-button' item xs={12}>
          <Typography variant='caption' sx={{ textTransform: 'none' }}>
            Sign up in minutes using Myinfo
          </Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { Button, Grid, Typography } from '@mui/material'
import { useStyles } from 'app/components/Header/components/Notifications/NotificationsDropdownContent/NotificationsDropdownContent.styles'

export const TwoFADropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item container justifyContent='center'>
        <Typography variant='h5'>
          Connect 2FA authorization to make operations
        </Typography>
      </Grid>

      <Grid item container justifyContent='flex-end'>
        <Button onClick={() => props.injectedProps.close()}>Later</Button>
      </Grid>
    </Grid>
  )
}

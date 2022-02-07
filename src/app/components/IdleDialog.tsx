import {
  DialogTitle,
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  Grid
} from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export interface IdleDialogProps {
  reset: () => void
  open: boolean
  closeDialog: () => void
  logout: () => void
  logoutTimer: number
  resetLogoutTimer: () => void
}

export const IdleDialog = ({
  reset,
  open,
  closeDialog,
  logout,
  logoutTimer,
  resetLogoutTimer
}: IdleDialogProps) => {
  const handleLogout = () => {
    logout()
    closeDialog()
  }

  const handleKeepLoggedIn = () => {
    reset()
    closeDialog()
    resetLogoutTimer()
  }

  return (
    <Dialog open={open}>
      <Box p={4}>
        <DialogTitle>
          <Typography variant='h5'>Your session is about to expire</Typography>
        </DialogTitle>
        <DialogContent>
          <Box textAlign='center' pb={4}>
            <Typography variant='body1'>
              You will be logged out in {logoutTimer} seconds.
            </Typography>
            <VSpacer size='small' />
            <Typography variant='body1'>
              Do you want to stay logged in?
            </Typography>
          </Box>
        </DialogContent>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item>
            <Button variant='outlined' color='primary' onClick={handleLogout}>
              No, log me out
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={handleKeepLoggedIn}
            >
              Yes, keep me logged in
            </Button>
          </Grid>
        </Grid>
        <VSpacer size='small' />
      </Box>
    </Dialog>
  )
}

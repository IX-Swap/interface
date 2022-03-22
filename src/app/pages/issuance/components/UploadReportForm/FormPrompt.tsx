import React, { useState } from 'react'
import { Prompt, useHistory } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { Action, Location } from 'history'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography
} from '@mui/material'

export const FormPrompt = () => {
  const { formState, reset } = useFormContext()
  const history = useHistory()

  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [nextLocation, setNextLocation] = useState<
    Location<unknown> | undefined
  >(undefined)

  const showCustomPrompt = (location: Location<unknown>, action: Action) => {
    setNextLocation(location)

    if ((action === 'PUSH' || action === 'REPLACE') && !confirmed) {
      setConfirmed(true)
      setOpen(true)
      return false
    }

    return true
  }

  const handleStay = () => {
    setConfirmed(false)
    setOpen(false)
  }

  const handleLeave = () => {
    if (nextLocation !== undefined) {
      reset()
      setConfirmed(false)
      setOpen(false)
      history.push(nextLocation)
    }
  }

  return (
    <>
      <Prompt when={formState.isDirty} message={showCustomPrompt} />
      <Dialog open={open}>
        <Box width='100%' py={4} px={5}>
          <DialogContent>
            <Box pb={2}>
              <Typography variant='h6' align='center'>
                Are you sure you want to leave this page?
              </Typography>
              <Typography align='center'>
                Entered information will not be saved
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Box pb={3} width='100%'>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={handleLeave}
                  >
                    Leave this page
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleStay}
                  >
                    Stay on this page
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

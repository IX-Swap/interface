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
} from '@material-ui/core'

export const FormPrompt = () => {
  const { formState } = useFormContext()
  const history = useHistory()

  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [nextLocation, setNextLocation] = useState<
    Location<unknown> | undefined
  >(undefined)

  const showCustomPrompt = (location: Location<unknown>, action: Action) => {
    setNextLocation(location)

    if (action === 'PUSH' && !confirmed) {
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
      history.push(nextLocation.pathname)
    }
  }

  return (
    <>
      <Prompt when={formState.isDirty} message={showCustomPrompt} />
      <Dialog open={open}>
        <DialogContent>
          <Box pt={3} pb={2}>
            <Typography variant='h6' align='center'>
              Are you sure you want to leave this page?
            </Typography>
            <Typography align='center'>
              Entered information will not be saved
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
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
              <Button variant='outlined' color='primary' onClick={handleStay}>
                Stay on this page
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}

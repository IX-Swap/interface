import { Box, Button, Dialog, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface ConfirmationDialogProps {
  onClose: () => void
  open: boolean
  assigning: boolean
  isAdditional?: boolean
}

export const ConfirmationDialog = ({
  onClose,
  open,
  assigning,
  isAdditional = false
}: ConfirmationDialogProps) => {
  const { watch } = useFormContext()
  const currency: string = watch('currency', '')

  const title = isAdditional
    ? 'Request for New Account'
    : `We are about to assign you an account in ${currency}`

  const bodyText = isAdditional
    ? 'You can have a new account in a different currency. Click on “send request” to continue.'
    : 'Would you like to continue?'

  const confirmLabel = isAdditional ? 'Send request' : 'Yes'

  return (
    <Dialog open={open} disablePortal onClose={onClose}>
      <Box py='40px' px='60px' textAlign='center'>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography variant='subtitle1'>{title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>{bodyText}</Typography>
          </Grid>
          <Grid item>
            <VSpacer size='small' />
            <Grid container spacing={1} justifyContent='center'>
              <Grid item>
                <Button
                  onClick={onClose}
                  type='button'
                  variant='outlined'
                  color='primary'
                  disableElevation
                  disabled={assigning}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disableElevation
                  disabled={assigning}
                >
                  {confirmLabel}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

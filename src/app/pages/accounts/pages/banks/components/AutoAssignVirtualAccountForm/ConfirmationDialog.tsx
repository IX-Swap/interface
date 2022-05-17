import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIDialog } from 'ui/UIDialog/UIDialog'

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
    <UIDialog open={open} disablePortal onClose={onClose}>
      <DialogTitle>
        <Typography variant='h2'>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align='center' color='gray' variant='body1'>
          {bodyText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} justifyContent='center'>
          <Grid item xs={6}>
            <Button
              fullWidth
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
          <Grid item xs={6}>
            <Button
              fullWidth
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
      </DialogActions>
    </UIDialog>
  )
}

import {
  Grid,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  DialogTitle
} from '@mui/material'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface IdentitySubmitConfirmationDialogProps {
  open: boolean
  closeDialog: () => void
}

export const IdentitySubmitConfirmationDialog = ({
  open,
  closeDialog
}: IdentitySubmitConfirmationDialogProps) => {
  const handleClick = () => {
    closeDialog()
  }

  return (
    <UIDialog open={open} maxWidth='md'>
      <DialogTitle>
        <Typography variant='h2' style={{ textAlign: 'center' }}>
          Thanks For Submitting Your Identity!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color='gray' align='center'>
          You will receive an e-mail shortly confirming your identity status.
        </Typography>
      </DialogContent>
      <DialogActions
        style={{ display: 'flex', paddingTop: 30, justifyContent: 'center' }}
      >
        <Grid container>
          <Button
            fullWidth
            variant='alternate'
            color='primary'
            disableRipple
            disableElevation
            onClick={handleClick}
          >
            Okay
          </Button>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

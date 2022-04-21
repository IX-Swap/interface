import {
  Box,
  DialogContent,
  DialogActions,
  Typography,
  Button
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
    <UIDialog open={open}>
      <Box p={6}>
        <Typography variant='h5' style={{ textAlign: 'center' }}>
          Thanks For Submitting Your Identity!
        </Typography>
        <DialogContent>
          <Typography>
            You will receive an e-mail shortly confirming your identity status.
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ display: 'flex', paddingTop: 30, justifyContent: 'center' }}
        >
          <Button
            variant='contained'
            color='primary'
            disableRipple
            disableElevation
            onClick={handleClick}
          >
            OK
          </Button>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}

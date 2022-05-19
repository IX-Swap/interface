import {
  Grid,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  DialogTitle,
  Box,
  useTheme
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

  const theme = useTheme()

  return (
    <UIDialog onClose={handleClick} open={open} maxWidth='md'>
      <DialogTitle>
        <Box p={2} textAlign='center'>
          Thanks for submitting your identity!
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography color={theme.palette.text.secondary} align='center'>
          You will receive an e-mail shortly confirming your identity status.
        </Typography>
      </DialogContent>
      <DialogActions
        style={{ display: 'flex', paddingTop: 30, justifyContent: 'center' }}
      >
        <Grid container>
          <Button
            fullWidth
            variant='outlined'
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

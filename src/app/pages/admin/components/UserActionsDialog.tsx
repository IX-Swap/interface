import React from 'react'
import {
  DialogActions,
  DialogProps,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
  Box,
  Grid
} from '@mui/material'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface UserActionsDialogProps extends DialogProps {
  action: () => void
  actionLabel: string
  title: string
  closeDialog: () => void
}

export const UserActionsDialog = (props: UserActionsDialogProps) => {
  const { action, actionLabel, title, closeDialog, children, ...rest } = props

  const handleClose = () => {
    closeDialog()
  }

  const handleAction = () => {
    action()
  }

  return (
    <UIDialog {...rest}>
      <DialogTitle>
        <Typography component='div' variant='h2' align='center'>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box pt={1} pb={2}>
          {children}
        </Box>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonTransparent
              fullWidth
              variant='contained'
              disableElevation
              onClick={handleClose}
            >
              Cancel
            </ButtonTransparent>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleAction}
              variant='contained'
              disableElevation
              color='primary'
            >
              {actionLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

import React from 'react'
import {
  DialogActions,
  DialogProps,
  DialogTitle,
  Button,
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
    <UIDialog maxWidth='sm' onClose={handleClose} {...rest}>
      <DialogTitle>
        <Box maxWidth={410} textAlign='center'>
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pt={1} pb={2}>
          {children}
        </Box>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
          <Grid item xs={5}>
            <ButtonTransparent
              fullWidth
              variant='contained'
              disableElevation
              onClick={handleClose}
              size='medium'
            >
              Cancel
            </ButtonTransparent>
          </Grid>
          <Grid item xs={5}>
            <Button
              fullWidth
              onClick={handleAction}
              variant='contained'
              disableElevation
              color='primary'
              size='medium'
            >
              {actionLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

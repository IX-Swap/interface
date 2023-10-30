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
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export interface UserActionsDialogProps extends DialogProps {
  action: () => void
  actionLabel: string
  title: string
  closeDialog: () => void
  isLoading?: boolean
}

export const UserActionsDialog = (props: UserActionsDialogProps) => {
  const {
    action,
    actionLabel,
    title,
    closeDialog,
    children,
    isLoading = false,
    ...rest
  } = props

  const handleClose = () => {
    closeDialog()
  }

  const handleAction = () => {
    action()
  }

  return (
    <UIDialog maxWidth='md' onClose={handleClose} {...rest}>
      {isLoading && <LoadingIndicator />}
      <DialogTitle>
        <Box mt={2} maxWidth={410} textAlign='center'>
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pt={1} pb={2}>
          {children}
        </Box>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
          <Grid item xs={5}>
            <ButtonTransparent
              fullWidth
              variant='contained'
              disableElevation
              onClick={handleClose}
              size='large'
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
              size='large'
            >
              {actionLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

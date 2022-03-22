import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Button,
  Theme,
  Typography,
  DialogContent,
  Box
} from '@mui/material'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import { withStyles } from '@mui/styles'

const styles: (theme: Theme) => any = theme => {
  return {
    paper: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      width: '90%',
      maxWidth: 800,
      borderRadius: theme.shape.borderRadius,
      '&>div': {
        padding: 0
      }
    }
  }
}

export interface UserActionsDialogProps extends DialogProps {
  action: () => void
  actionLabel: string
  title: string
  closeDialog: () => void
}

export const UserActionsDialog = withStyles(styles)(
  (props: UserActionsDialogProps) => {
    const { action, actionLabel, title, closeDialog, children, ...rest } = props

    const handleClose = () => {
      closeDialog()
    }

    const handleAction = () => {
      action()
    }

    return (
      <Dialog {...rest}>
        <DialogTitle>
          <Typography component='div' variant='h6' align='center'>
            {title}
          </Typography>
        </DialogTitle>
        <Box paddingY={3} component='span' display='block' />
        <DialogContent>{children}</DialogContent>
        <Box paddingY={3} component='span' display='block' />
        <DialogActions>
          <ButtonTransparent
            variant='contained'
            disableElevation
            onClick={handleClose}
          >
            Cancel
          </ButtonTransparent>
          <Button
            onClick={handleAction}
            variant='contained'
            disableElevation
            color='primary'
          >
            {actionLabel}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

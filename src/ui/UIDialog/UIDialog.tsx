import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Grid
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'

interface UIDialogAction {
  callback?: () => void
  text: string
  type: 'contained' | 'alternate'
}

export type UIDialogActions =
  | []
  | [UIDialogAction]
  | [UIDialogAction, UIDialogAction]

export interface UIDialogProps {
  open: boolean
  onClose: () => void
  title: React.ReactNode | string
  body: React.ReactNode | string
  actions?: UIDialogActions | React.ReactNode
  actionsDirection?: 'row' | 'column'
}

export const UIDialog = (props: UIDialogProps) => {
  const {
    onClose,
    open,
    body,
    actions,
    title,
    actionsDirection = 'row'
  } = props
  const classes = useStyles()

  const renderAction = (
    { callback, text, type }: UIDialogAction,
    index: number
  ) => (
    <Grid
      item
      xs={
        actions != null && Array.isArray(actions) && actions?.length > 1
          ? 6
          : 12
      }
      key={index}
    >
      <Button className={classes.btnWrapper} variant={type} onChange={callback}>
        {text}
      </Button>
    </Grid>
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <IconButton
        className={classes.iconWrapper}
        aria-label='close'
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {body}
        </DialogContentText>
      </DialogContent>
      {actions != null && Array.isArray(actions) && actions?.length > 0 && (
        <DialogActions>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={actionsDirection}
          >
            {actions.map(renderAction)}
          </Grid>
        </DialogActions>
      )}
    </Dialog>
  )
}

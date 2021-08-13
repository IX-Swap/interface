import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { useStyles } from './DisclosureDialog.style'

export interface DisclosureDialogProps {
  content: any
  isOpen: boolean
  onClose: () => void
}

export const DisclosureDialog = ({
  content,
  isOpen,
  onClose
}: DisclosureDialogProps) => {
  const classes = useStyles()

  return (
    <Dialog open={isOpen} maxWidth={'md'} classes={{ paper: classes.root }}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        Disclosure
      </DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </DialogContentText>
      <DialogActions classes={{ root: classes.actions }}>
        <Button
          type={'button'}
          variant={'contained'}
          color={'primary'}
          onClick={() => onClose()}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

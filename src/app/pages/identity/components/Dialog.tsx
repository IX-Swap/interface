import React, { cloneElement, useState } from 'react'
import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions
} from '@material-ui/core'

export interface ModalProps extends Partial<DialogProps> {
  button: JSX.Element
  title: string
  content: JSX.Element | string
  actions?: JSX.Element | JSX.Element[]
}

export const Dialog = (props: ModalProps) => {
  const { button, title, content, actions, ...rest } = props
  const [isOpened, setIsOpened] = useState(false)
  const handleOpen = () => setIsOpened(true)
  const handleClose = () => setIsOpened(false)

  return (
    <>
      {cloneElement(button, { onClick: handleOpen })}
      <MUIDialog
        {...rest}
        open={isOpened}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </MUIDialog>
    </>
  )
}

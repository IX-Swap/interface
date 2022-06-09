import React, { cloneElement, useState } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  Box
} from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import useStyles from './Dialog.style'
import { Icon } from 'ui/Icons/Icon'

// @ts-expect-error
export interface ModalProps extends Partial<DialogProps> {
  button: JSX.Element
  title: JSX.Element | string
  content: JSX.Element | string
  actions?: JSX.Element | JSX.Element[]
}

export const Dialog = (props: ModalProps) => {
  const classes = useStyles()
  const { button, title, content, actions, maxWidth, ...rest } = props
  const [isOpened, setIsOpened] = useState(false)
  const handleOpen = (e: Event) => {
    e.preventDefault()
    setIsOpened(true)
  }
  const handleClose = () => setIsOpened(false)

  const renderActions = () => {
    if (actions === undefined) {
      return null
    }
    if (Array.isArray(actions)) {
      return actions.map(action => cloneElement(action, { close: handleClose }))
    }
    return cloneElement(actions, { close: handleClose })
  }

  return (
    <>
      {cloneElement(button, { onClick: handleOpen })}
      <UIDialog
        {...rest}
        maxWidth={maxWidth}
        open={isOpened}
        onClose={handleClose}
        showIconClose={false}
        classes={{ root: classes.dialog }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <DialogTitle classes={{ root: classes.title }}>
          <Icon className={classes.icon} name='close' onClick={handleClose} />
          <Box textAlign='center'>{title}</Box>
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          {content}
        </DialogContent>
        <DialogActions classes={{ root: classes.actions }}>
          {renderActions()}
        </DialogActions>
      </UIDialog>
    </>
  )
}

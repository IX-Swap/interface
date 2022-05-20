import React, { cloneElement, CSSProperties, useState } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  Box
} from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ModalProps extends Partial<DialogProps> {
  button: JSX.Element
  title: string
  content: JSX.Element | string
  actions?: JSX.Element | JSX.Element[]
  titleStyle?: CSSProperties
}

export const Dialog = (props: ModalProps) => {
  const { button, title, content, actions, titleStyle, maxWidth, ...rest } =
    props
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
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <DialogTitle style={titleStyle}>
          <Box textAlign='center'>{title}</Box>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }}>
          {content}
        </DialogContent>
        <DialogActions>{renderActions()}</DialogActions>
      </UIDialog>
    </>
  )
}

import React, { cloneElement, CSSProperties, useState } from 'react'
import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  Box
} from '@mui/material'

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
      <MUIDialog
        {...rest}
        maxWidth={maxWidth}
        open={isOpened}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box p={maxWidth === undefined || maxWidth === 'xs' ? 2 : 8}>
          <DialogTitle style={titleStyle}>{title}</DialogTitle>
          <DialogContent style={{ overflowY: 'initial' }}>
            {content}
          </DialogContent>
          <DialogActions>{renderActions()}</DialogActions>
        </Box>
      </MUIDialog>
    </>
  )
}

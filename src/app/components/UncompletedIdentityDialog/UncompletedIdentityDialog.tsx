import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { BackDrop } from 'app/components/BackDrop'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useUncompletedIdentityDialogData } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialogData'
import { useStyles } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog.styles'

export const EmptyBackDrop = () => <></>

export const UncompletedIdentityDialog = () => {
  const history = useHistory()
  const { data, isLoading } = useUncompletedIdentityDialogData()
  const [opened, setOpened] = useState(true)
  const { scrollPaper, paper, content, actions, root, button } = useStyles()

  const handleClose = () => {
    setOpened(false)
  }

  const renderContent = () => {
    if (isLoading || data === undefined) {
      return <LoadingIndicator />
    }

    const { title, message, action, actionLabel } = data

    return (
      <>
        <DialogTitle className={title}>{title}</DialogTitle>
        <DialogContent className={content}>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions className={actions} onClick={handleClose}>
          <Button
            className={button}
            variant={'contained'}
            onClick={e => {
              if (action !== null) {
                history.push(action)
              }
              e.preventDefault()
            }}
          >
            {actionLabel}
          </Button>
        </DialogActions>
      </>
    )
  }

  return (
    <>
      <UIDialog
        open={opened}
        onClose={handleClose}
        classes={{
          root: root,
          paper: paper,
          scrollPaper: scrollPaper
        }}
        BackdropComponent={EmptyBackDrop}
      >
        {renderContent()}
      </UIDialog>
      <BackDrop onClick={handleClose} opened={opened} />
    </>
  )
}

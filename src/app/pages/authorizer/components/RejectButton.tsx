import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useStyles } from 'app/pages/authorizer/components/styles'
import classNames from 'classnames'
import { RejectDialogBox } from './RejectDialogBox'

export interface RejectButtonProps {
  disabled: boolean
  reject: Function
}

export const RejectButton = (props: RejectButtonProps) => {
  const classes = useStyles()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const { disabled, reject } = props

  const closeDialog = () => {
    setOpenConfirmDialog(false)
  }

  const openDialog = () => {
    setOpenConfirmDialog(true)
  }

  return (
    <>
      <Button
        style={{ width: '45%' }}
        size='large'
        variant='contained'
        onClick={openDialog}
        disabled={disabled}
        className={classNames({
          [classes.rejectedButton]: !disabled
        })}
      >
        Reject
      </Button>
      <RejectDialogBox
        reject={reject}
        open={openConfirmDialog}
        close={closeDialog}
      />
    </>
  )
}

import React, { useState } from 'react'
import { Button } from '@mui/material'
import { ConfirmDisableDialogBox } from './ApproveDialogBox'

export interface ApproveButtonProps {
  disabled: boolean
  approve: Function
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const { disabled, approve } = props
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const closeDialog = () => {
    setOpenConfirmDialog(false)
  }

  const openDialog = () => {
    setOpenConfirmDialog(true)
  }

  // const handleClick = async () => approve()

  return (
    <>
      <Button
        style={{ width: '45%' }}
        size='large'
        variant='contained'
        // onClick={handleClick}
        onClick={openDialog}
        disabled={disabled}
      >
        Approve
      </Button>
      <ConfirmDisableDialogBox
        approve={approve}
        open={openConfirmDialog}
        close={closeDialog}
      />
    </>
  )
}

import { Box, DialogContent, Typography } from '@mui/material'
import { Action, Location } from 'history'
import React, { useEffect, useState } from 'react'
import { Prompt } from 'react-router-dom'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export const LeavePagePrompt = ({ showPrompt }: { showPrompt: boolean }) => {
  const [open, setOpen] = useState(showPrompt)
  useEffect(() => {
    setOpen(showPrompt)
  }, [showPrompt])
  const showCustomPrompt = (location: Location<unknown>, action: Action) => {
    return false
  }

  const handleStay = () => {
    setOpen(false)
  }

  return (
    <>
      <Prompt when={showPrompt} message={showCustomPrompt} />
      <UIDialog open={open} onClose={handleStay}>
        <DialogContent>
          <Box pt={2} px={1}>
            <Typography align='center'>
              Please continue the transfer process on your wallet. Also, please
              do not refresh or close this page.
            </Typography>
          </Box>
        </DialogContent>
      </UIDialog>
    </>
  )
}

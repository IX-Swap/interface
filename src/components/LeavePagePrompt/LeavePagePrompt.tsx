import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material'
import { Action, Location } from 'history'
import React, { useEffect, useState } from 'react'
import { Prompt } from 'react-router-dom'

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
      <Dialog open={open} onClose={handleStay}>
        <Box width='100%' py={1} px={1}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleStay} size='large'>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Typography align='center'>
                Please continue the transfer process on your wallet. Also,
                please do not refresh or close this page.
              </Typography>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}

import { Box, DialogContent, Typography } from '@mui/material'
import { Action, Location } from 'history'
import React, { useEffect, useState } from 'react'
import { Prompt } from 'react-router-dom'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useStyles } from './LeavePagePrompt.styles'
export const LeavePagePrompt = ({
  showPrompt,
  showCongested
}: {
  showPrompt: boolean
  showCongested: boolean
}) => {
  const [open, setOpen] = useState(showPrompt)
  const classes = useStyles()
  useEffect(() => {
    setOpen(showPrompt)
  }, [showPrompt])
  const showCustomPrompt = (location: Location<unknown>, action: Action) => {
    return false
  }
  useEffect(() => {
    if (showCongested) {
      setOpen(true)
    }
  }, [showCongested])
  const handleStay = () => {
    setOpen(false)
  }
  return (
    <>
      <Prompt when={showPrompt} message={showCustomPrompt} />
      <UIDialog open={open && showPrompt} onClose={handleStay}>
        <DialogContent>
          <Box pt={2} px={1}>
            <Typography align='center'>
              Please continue the transfer process on your wallet. Also, please
              do not refresh or close this page. This message will close itself.
            </Typography>
            {showCongested && (
              <Typography className={classes.congested}>
                The blockchain network seems to be busier than usual. Please
                wait for sometime or try again later.
              </Typography>
            )}
          </Box>
        </DialogContent>
      </UIDialog>
    </>
  )
}

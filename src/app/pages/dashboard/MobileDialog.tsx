import React from 'react'
import { Box, DialogContentText, DialogTitle } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/DisclosureDialog/DisclosureDialog.style'

import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface MobileDialogProps {
  isOpen: boolean
  toggleModal: () => void
}
export const MobileDialog = ({ isOpen, toggleModal }: MobileDialogProps) => {
  const classes = useStyles()

  const handleClose = () => {
    sessionStorage.setItem('mobileMode', 'false')
    toggleModal()
  }

  return (
    <UIDialog
      open={isOpen}
      maxWidth={'md'}
      classes={{ paper: classes.header }}
      onClose={handleClose}
      isMobile={true}
    >
      <DialogTitle classes={{ root: classes.title }}></DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        <Box className={classes.scrollable}>
          To get the best performance of the app, we recommend using any of the
          recent stable versions of the Chrome, Brave, or any Firefox browsers.
          For wallets, we recommend Trust Wallet, Metamask, or Coinbase Wallet.
        </Box>
      </DialogContentText>
    </UIDialog>
  )
}

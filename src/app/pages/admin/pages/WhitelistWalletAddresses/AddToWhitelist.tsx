import React from 'react'
import { useHistory } from 'react-router-dom'
import { WhitelistWalletAddressesRoute } from '../../router/config'
import {
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography
} from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export const AddToWhitelist = () => {
  const { replace } = useHistory()
  const onClose = () => replace(WhitelistWalletAddressesRoute.list)

  return (
    <UIDialog open onClose={onClose}>
      <Box p={4}>
        <DialogTitle>
          <Typography variant='h3'>Add to Whitelist</Typography>
        </DialogTitle>
        <DialogContent sx={{ width: '600px', maxWidth: '100%' }}>
          <Typography variant='body1'></Typography>
        </DialogContent>
        <Box display={'flex'} gap={2}>
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            sx={{ marginTop: 3, paddingY: 2 }}
            onClick={onClose}
            disableElevation
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ marginTop: 3, paddingY: 2 }}
            onClick={onClose}
            disableElevation
          >
            Add to Whitelist
          </Button>
        </Box>
      </Box>
    </UIDialog>
  )
}

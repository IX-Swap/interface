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
import { Add } from '@mui/icons-material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { SecurityTokenDropdown } from './SecurityTokenDropdown'
import { WalletAddressDropdown } from './WalletAddressDropdown'

export const AddToWhitelist = () => {
  const { replace } = useHistory()
  const onClose = () => replace(WhitelistWalletAddressesRoute.list)

  return (
    <UIDialog open onClose={onClose}>
      <DialogTitle>
        <Typography variant='h3'>Add to Whitelist</Typography>
      </DialogTitle>
      <DialogContent sx={{ width: '600px', maxWidth: '100%' }}>
        <SecurityTokenDropdown />

        <Box display={'flex'} alignItems={'end'} gap={2} mt={3}>
          <WalletAddressDropdown />
          <Button
            variant='contained'
            color='primary'
            onClick={onClose}
            sx={{ width: '250px', paddingX: 1, paddingY: 1.5 }}
            disableElevation
          >
            <Add sx={{ marginRight: 1 }} />
            Wallet Address
          </Button>
        </Box>
        <Box display={'flex'} gap={2} mt={3}>
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            onClick={onClose}
            sx={{ paddingY: 2 }}
            disableElevation
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={onClose}
            sx={{ paddingY: 2 }}
            disableElevation
          >
            Add to Whitelist
          </Button>
        </Box>
      </DialogContent>
    </UIDialog>
  )
}

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography
} from '@mui/material'
import { useUnassignVirtualAccount } from 'app/pages/admin/hooks/useUnassignVirtualAccount'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ConfirmUnassignDialogProps {
  account: VirtualAccount
  closeDialog: () => void
  open: boolean
}

export const ConfirmUnassignDialog = ({
  account,
  closeDialog,
  open
}: ConfirmUnassignDialogProps) => {
  const [unassignVirtualAccount, { isLoading }] = useUnassignVirtualAccount()

  const handleConfirm = async () => {
    await unassignVirtualAccount(account)
    closeDialog()
  }

  return (
    <UIDialog open={open}>
      <Box p={4}>
        <Typography variant='subtitle1' align='center'>
          Are You Sure You Want to Unassign This Virtual Account?
        </Typography>
        <VSpacer size='small' />
        <DialogContent>
          <Typography variant='body1'>
            User linked to this virtual account will no longer be able to use
            it.
          </Typography>
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Button color='primary' variant='outlined' onClick={closeDialog}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                disableElevation
                onClick={handleConfirm}
                disabled={isLoading}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}

import {
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
  Box
} from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
// import { ConfirmDisableButton } from 'app/pages/admin/components/DisableAccountsButton/ConfirmDisableButton'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ConfirmDisableDialogBoxProps {
  open: boolean
  close: () => void
  approve: Function
}

export const ConfirmDisableDialogBox = ({
  open,
  close,
  approve
}: ConfirmDisableDialogBoxProps) => {
  const handleClick = async () => approve()
  return (
    <UIDialog onClose={close} open={open}>
      <Box py={4} px={3}>
        <Typography variant='h3' align='center'>
          Are You Sure You Want to Approve This Application?
        </Typography>
        <DialogContent>
          <Typography variant='body1' align='center'>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid display={'flex'} container spacing={2} justifyContent='center'>
            <Button
              style={{ width: '45%' }}
              //   fullWidth
              variant='outlined'
              color='primary'
              onClick={close}
            >
              Cancel
            </Button>
            <Box mx={1} />
            <Button
              style={{ width: '45%' }}
              //   fullWidth
              size='large'
              variant='contained'
              onClick={handleClick}
            >
              Yes
            </Button>
          </Grid>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}
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
import { ConfirmDisableButton } from 'app/pages/admin/components/DisableAccountsButton/ConfirmDisableButton'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ConfirmDisableDialogBoxProps {
  open: boolean
  close: () => void
}

export const ConfirmDisableDialogBox = ({
  open,
  close
}: ConfirmDisableDialogBoxProps) => {
  return (
    <UIDialog open={open}>
      <Box py={4} px={3}>
        <Typography variant='subtitle1' align='center'>
          Are You Sure You Want to Disable the Virtual Account(s)?
        </Typography>
        <DialogContent>
          <Typography variant='body1' align='center'>
            User linked to the selected virtual account will no longer be able
            to use it.
          </Typography>
        </DialogContent>
        <VSpacer size='small' />
        <DialogActions>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Button variant='outlined' color='primary' onClick={close}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <ConfirmDisableButton successCallback={close} />
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  useTheme
} from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ConfirmationDialogProps {
  onClose: () => void
  open: boolean
  assigning: boolean
  isAdditional?: boolean
}

export const ConfirmationDialog = ({
  onClose,
  open,
  assigning,
  isAdditional = false
}: ConfirmationDialogProps) => {
  const { watch } = useFormContext()
  const currency: string = watch('currency', '')
  const theme = useTheme()

  const title = isAdditional
    ? 'Request for New Account'
    : `We are about to assign you an account in ${currency}`

  const bodyText = isAdditional
    ? 'You can have a new account in a different currency. Click on “send request” to continue.'
    : 'Would you like to continue?'

  const confirmLabel = isAdditional ? 'Send request' : 'Yes'

  return (
    <UIDialog maxWidth='sm' open={open} disablePortal onClose={onClose}>
      <DialogTitle>
        <Box textAlign='center'>{title}</Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          align='center'
          color={theme.palette.text.secondary}
          variant='body1'
        >
          {bodyText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          spacing={2}
          justifyContent='center'
          alignContent='center'
        >
          <Grid item xs={5}>
            <Button
              style={{ height: 50 }}
              size='medium'
              fullWidth
              onClick={onClose}
              type='button'
              variant='outlined'
              color='primary'
              disableElevation
              disabled={assigning}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              style={{ height: 50 }}
              size='medium'
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              disableElevation
              disabled={assigning}
            >
              {confirmLabel}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

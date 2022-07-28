import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme
} from '@mui/material'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ConfirmationDialogProps {
  onClose: () => void
  handleSubmit: () => Promise<void>
  open: boolean
  assigning: boolean
  currency: string
}

export const ConfirmationDialog = ({
  onClose,
  handleSubmit,
  open,
  assigning,
  currency = 'SGD'
}: ConfirmationDialogProps) => {
  const theme = useTheme()
  const title = `Add ${currency} account`
  const bodyText = `Do you want to assign a ${currency} account?`
  const confirmLabel = 'Assign'

  return (
    <UIDialog maxWidth='sm' open={open} disablePortal onClose={onClose}>
      <DialogTitle>
        <Box textAlign='center' mt={5}>
          {title}
        </Box>
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
              size='large'
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
              size='large'
              fullWidth
              onClick={handleSubmit}
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

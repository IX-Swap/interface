import { Box, Button, Dialog, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface ConfirmationDialogProps {
  onClose: () => void
  open: boolean
  assigning: boolean
}

export const ConfirmationDialog = ({
  onClose,
  open,
  assigning
}: ConfirmationDialogProps) => {
  const { watch } = useFormContext()
  const currency: string = watch('currency', '')

  return (
    <Dialog open={open} disablePortal>
      <Box py='40px' px='60px' textAlign='center'>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography variant='subtitle1'>
              {`We are about to assign you an account in ${currency}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>Would you like to continue?</Typography>
          </Grid>
          <Grid item>
            <VSpacer size='small' />
            <Grid container spacing={1} justify='flex-end'>
              <Grid item>
                <Button
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
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disableElevation
                  disabled={assigning}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

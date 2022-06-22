import { Box, Button, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useCreateOrUpdateMASDisclosure } from 'app/pages/admin/hooks/useCreateOrUpdateMASDisclosure'
import { useFormContext } from 'react-hook-form'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface MasDisclosureConfirmDialogProps {
  onClose: () => void
  open: boolean
}

export const MasDisclosureConfirmDialog = ({
  onClose,
  open
}: MasDisclosureConfirmDialogProps) => {
  const { watch } = useFormContext()
  const content = watch('content')

  const [createOrUpdateMasDisclosure] = useCreateOrUpdateMASDisclosure()
  const handleSubmit = async () => {
    onClose()
    await createOrUpdateMasDisclosure({ content: content })
  }

  return (
    <UIDialog open={open} disablePortal data-testid='mas-disclosure-dialog'>
      <Box py='40px' px='60px' textAlign='center'>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography variant='subtitle1'>
              Do You Want to Update the Disclosure?
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              New disclosure will be displayed on the exchange screen
            </Typography>
          </Grid>
          <Grid item>
            <VSpacer size='small' />
            <Grid container spacing={1} justifyContent='center'>
              <Grid item>
                <Button
                  onClick={onClose}
                  type='button'
                  variant='outlined'
                  color='primary'
                  disableElevation
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  disableElevation
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </UIDialog>
  )
}

import {
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
  Box,
  useTheme
} from '@mui/material'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ClearFormDialogProps {
  open: boolean
  close: () => void
  clearForm: Function
}

export const ClearFormDialog = ({
  open,
  close,
  clearForm
}: ClearFormDialogProps) => {
  const theme = useTheme()
  return (
    <UIDialog onClose={close} open={open}>
      <Box py={4} px={3}>
        <Typography variant='h3' align='center'>
          Are You Sure You Want to <br />
          Clear This Form?
        </Typography>
        <DialogContent>
          <Typography variant='body1' align='center' color='tooltip.color'>
            Clearing this form will clear all your existing inputs.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid
            display={'flex'}
            gap={3}
            container
            alignItems={'center'}
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              paddingTop: 3
            }}
          >
            <Grid item xs>
              <Button
                size='large'
                variant='outlined'
                color='primary'
                onClick={close}
                fullWidth
                disableElevation
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                size='large'
                variant='contained'
                onClick={() => {
                  clearForm()
                  close()
                }}
                fullWidth
                disableElevation
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

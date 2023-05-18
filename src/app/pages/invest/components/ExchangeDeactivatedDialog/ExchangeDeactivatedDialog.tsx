import {
  Box,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Actions } from 'app/pages/invest/components/ExchangeDeactivatedDialog/Actions'
import useStyles from 'app/pages/invest/components/ExchangeDeactivatedDialog/ExchangeDeactivatedDialog.styles'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const ExchangeDeactivatedDialog = (props: ModalProps) => {
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <UIDialog
      maxWidth={'md'}
      fullScreen={fullScreen}
      open={open}
      classes={{
        paper: classes.dialog,
        root: classes.dialog
      }}
      onClose={() => toggleOpen(false)}
      aria-labelledby='exchange-deactivated-modal-title'
      aria-describedby='exchange-deactivated-modal-description'
    >
      <Box>
        <DialogTitle>
          <Box justifyContent='center' alignItems='center'>
            <Typography variant='h6' component='span' align='center'>
              Exchange
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          style={{ overflowY: 'initial' }}
          className={classes.content}
        >
          <Grid container direction='column'>
            <Grid item>
              <Typography variant='subtitle2' align='center'>
                We are adding new features to our Exchange platform. Stay Tuned!
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box mt={1} width={1}>
            <Actions action={toggleOpen} />
          </Box>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}
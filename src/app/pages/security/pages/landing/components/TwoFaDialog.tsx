import React from 'react'
import { Dialog, Box, Typography, Grid, Button } from '@material-ui/core'
import gAuthImg from '../assets/googleauth.png'
import useStyles from './TwoFaDialog.styles'

export interface TwoFaDialogProps {
  closeFn: () => void
  nextFn: () => void
  isOpen: boolean
}

export const TwoFaDialog = ({ closeFn, nextFn, isOpen }: TwoFaDialogProps) => {
  const classes = useStyles()
  return (
    <Dialog fullWidth open={isOpen} onClose={closeFn}>
      <Box mt={4} p={4}>
        <Typography align='center'>
          To increase your account security, please enable 2FA.
        </Typography>
        <Grid container justifyContent='center'>
          <Box
            width='60%'
            mt={4}
            p={2}
            border={1}
            borderColor='grey.300'
            component='button'
            onClick={nextFn}
          >
            <Grid container alignItems='center' justifyContent='center'>
              <Grid item>
                <img src={gAuthImg} className={classes.btnImg} alt='gAuth' />
              </Grid>
              <Grid item>
                <b className={classes.btnLabel}>Google Authenticator</b>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Box pt={4}>
          <Button onClick={closeFn}>Skip for now</Button>
        </Box>
      </Box>
    </Dialog>
  )
}

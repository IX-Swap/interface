import React from 'react'
import { Actions } from 'app/components/TwoFADialog/Actions/Actions'
import { useAuth } from 'hooks/auth/useAuth'
import { Description } from 'app/components/TwoFADialog/Description/Description'
import { InfoIcon } from 'app/components/TwoFADialog/InfoIcon'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from '@mui/material'
import { SupportInfo } from 'app/components/TwoFADialog/SupportInfo/SupportInfo'
import { useStyles } from './TwoFADialog.styles'
import { Icon } from 'ui/Icons/Icon'

export interface TwoFADialogProps {
  isOpen: boolean
  onClose: () => void
}

export const TwoFADialog = ({ isOpen, onClose }: TwoFADialogProps) => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user
  const classes = useStyles()

  const renderBody = () => {
    return (
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <Grid item>
          <InfoIcon enable2Fa={enable2Fa} />
        </Grid>
        <Grid item className={classes.contentItem}>
          <Description enable2Fa={enable2Fa} />
        </Grid>
        <Grid item className={classes.contentItem}>
          <SupportInfo />
        </Grid>
      </Grid>
    )
  }

  return (
    <Dialog open={isOpen} onClose={onClose} classes={{ paper: classes.paper }}>
      <IconButton onClick={onClose} className={classes.closeBtn}>
        <Icon name='close' />
      </IconButton>
      <DialogTitle className={classes.title}>
        Connect 2FA authorization to make operations
      </DialogTitle>
      <DialogContent className={classes.content}>{renderBody()}</DialogContent>
      <DialogActions className={classes.actions}>
        <Actions enable2fa={enable2Fa} handleClose={() => onClose} />
      </DialogActions>
    </Dialog>
  )
}

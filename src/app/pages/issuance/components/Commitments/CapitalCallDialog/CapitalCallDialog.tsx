import React, { useState } from 'react'
import {
  Typography,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  useMediaQuery,
  useTheme,
  Box,
  Button,
  Grid
} from '@material-ui/core'
import useStyles from './CapitalCallDialog.styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'
import { useCapitalCall } from 'app/pages/issuance/hooks/useCapitalCall'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const CapitalCallDialog = (props: ModalProps) => {
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [emails, setEmails] = useState<string[]>([])

  const {
    mutation: [capitalCall, { isLoading, status }]
  } = useCapitalCall()

  const handleSubmit = async () => {
    await capitalCall(emails)

    if (status === 'success') {
      toggleOpen()
      setEmails([])
    }
  }

  return (
    <MUIDialog
      maxWidth={'sm'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => toggleOpen(false)}
      aria-labelledby='capital-call-modal-title'
      aria-describedby='capital-call-modal-description'
    >
      <DialogTitle className={classes.titleRoot}>
        <Typography
          variant='h6'
          component='span'
          align='center'
          className={classes.title}
        >
          Capital Call
        </Typography>
        <IconButton
          aria-label='close'
          onClick={() => toggleOpen(false)}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant={'body1'} align={'left'}>
          You can enter multiple email address of “Not Funded” investors. Email
          will be sent to notify them.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <ReactMultiEmail
          className={classes.multiEmail}
          emails={emails}
          placeholder={'Enter Email'}
          onChange={(_emails: string[]) => {
            setEmails(_emails)
          }}
          validateEmail={email => {
            return isEmail(email)
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void
          ) => {
            return (
              <Box
                component={'div'}
                data-tag
                key={index}
                className={classes.emailItem}
              >
                <Typography
                  variant={'body1'}
                  component='div'
                  color={'textPrimary'}
                >
                  {email}
                </Typography>
                <Box
                  component={'div'}
                  data-tag-handle
                  className={classes.removeItem}
                  style={{ fontWeight: 400 }}
                  onClick={() => removeEmail(index)}
                >
                  ×
                </Box>
              </Box>
            )
          }}
        />
        <Grid
          container
          justifyContent={'flex-end'}
          className={classes.buttonsBlock}
        >
          <Button
            variant={'outlined'}
            color={'primary'}
            className={classes.cancelButton}
            onClick={() => toggleOpen()}
          >
            Cancel
          </Button>
          <Button
            variant={'contained'}
            color={'primary'}
            className={classes.confirmButton}
            disabled={isLoading || !(emails.length > 0)}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Grid>
      </DialogActions>
    </MUIDialog>
  )
}

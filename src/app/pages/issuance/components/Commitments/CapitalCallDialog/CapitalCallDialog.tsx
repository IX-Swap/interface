import React, { useState } from 'react'
import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  useMediaQuery,
  useTheme,
  Box,
  Button,
  Grid
} from '@mui/material'
import useStyles from './CapitalCallDialog.styles'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'
import { useCapitalCall } from 'app/pages/issuance/hooks/useCapitalCall'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Icon } from 'ui/Icons/Icon'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const CapitalCallDialog = (props: ModalProps) => {
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
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
    <UIDialog
      maxWidth={'sm'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => toggleOpen(false)}
      aria-labelledby='capital-call-modal-title'
      aria-describedby='capital-call-modal-description'
    >
      <DialogTitle>
        <Box textAlign='center'>Notify investors</Box>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography
          color={theme.palette.text.secondary}
          variant={'body1'}
          align={'left'}
        >
          You can enter multiple email addresses of “Not Funded” investors.
          Email will be sent to notify them.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Box ml={1} mb={1}>
          <Typography color={theme.palette.dialog.color}>
            Enter email
          </Typography>
        </Box>
        <ReactMultiEmail
          placeholder='Type email and press space...'
          className={classes.multiEmail}
          emails={emails}
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
                <Typography variant={'body1'} component='div' color='white'>
                  {email}
                </Typography>
                <Box
                  component={'div'}
                  data-tag-handle
                  className={classes.removeItem}
                  style={{ fontWeight: 400 }}
                  onClick={() => removeEmail(index)}
                >
                  <Icon name='close' />
                </Box>
              </Box>
            )
          }}
        />
        <Grid
          container
          justifyContent={'flex-end'}
          className={classes.buttonsBlock}
          spacing={2}
        >
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={'outlined'}
              color={'primary'}
              className={classes.cancelButton}
              onClick={() => toggleOpen()}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant={'contained'}
              color={'primary'}
              className={classes.confirmButton}
              disabled={isLoading || !(emails.length > 0)}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}

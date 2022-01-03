import React from 'react'
import {
  Typography,
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import useStyles from './CloseDealDialog.styles'
import { OTPForm } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPForm'
import { VSpacer } from 'components/VSpacer'
import { useCloseDeal } from 'app/pages/issuance/hooks/useCloseDeal'
import { useParams } from 'react-router-dom'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const CloseDealDialog = (props: ModalProps) => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    mutation: [closeDeal, { isLoading }]
  } = useCloseDeal()

  return (
    <MUIDialog
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => toggleOpen(false)}
      onBackdropClick={() => toggleOpen(false)}
      aria-labelledby='close-deal-modal-title'
      aria-describedby='close-deal-modal-description'
    >
      <Box py={3} px={2.5}>
        <DialogTitle className={classes.titleRoot}>
          <Box justifyContent='center' alignItems='center'>
            <Typography
              variant='h4'
              component='span'
              align='center'
              className={classes.title}
            >
              Are you sure you want to close this deal?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }}>
          <Box justifyContent='center' alignItems='center'>
            <Typography variant={'body1'} align={'center'}>
              Investor will no longer be able to invest on this deal
            </Typography>
            <VSpacer size={'small'} />
            <Typography variant={'body2'} align={'center'}>
              Please enter OTP from your authenticator before proceeding
            </Typography>
          </Box>
        </DialogContent>
        <VSpacer size={'small'} />
        <DialogActions>
          <OTPForm
            data-testid='otp-form'
            isLoading={isLoading}
            onClose={() => toggleOpen()}
            onSubmit={async values => {
              if (dsoId) {
                await closeDeal({ dso: dsoId, ...values })
                toggleOpen()
              }
            }}
          />
        </DialogActions>
      </Box>
    </MUIDialog>
  )
}

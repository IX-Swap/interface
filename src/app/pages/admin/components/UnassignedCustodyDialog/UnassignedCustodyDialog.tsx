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
  useTheme,
  IconButton
} from '@material-ui/core'
import useStyles from 'app/pages/admin/components/UnassignedCustodyDialog/UnassignedCustodyDialog.styles'
import { OTPForm } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPForm'
import { VSpacer } from 'components/VSpacer'
import { Close as CloseIcon } from '@material-ui/icons'
import { CustodyAccountsListItem } from 'types/custodyAccount'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  custodyAccount: CustodyAccountsListItem | null
  onClose: () => void
}

export const UnassignedCustodyDialog = (props: ModalProps) => {
  const theme = useTheme()
  const classes = useStyles()

  const { open = false, onClose } = props
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // TODO added unassigned function after complete backend api endpoint
  // const {
  //   mutation: [closeDeal, { isLoading }]
  // } = useCloseDeal()

  return (
    <MUIDialog
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => onClose()}
      onBackdropClick={() => onClose()}
      aria-labelledby='close-deal-modal-title'
      aria-describedby='close-deal-modal-description'
    >
      <DialogTitle className={classes.titleRoot}>
        <IconButton
          size='small'
          onClick={() => onClose()}
          className={classes.closeBtn}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant='h4'
          component='span'
          align='center'
          className={classes.title}
        >
          Are You Sure You Want to Unassign the Custody?
        </Typography>
      </DialogTitle>
      <DialogContent style={{ overflowY: 'initial' }}>
        <Box justifyContent='center' alignItems='center'>
          <Typography variant={'body1'} align={'center'}>
            Unassigning the custody will result in loss of tokens and user will
            not be
            <br /> able to use the same address again.
          </Typography>
          <VSpacer size={'small'} />
          <VSpacer size={'extraSmall'} />
          <Typography variant={'body1'} align={'center'}>
            Please enter OTP from your authenticator before proceeding
          </Typography>
        </Box>
      </DialogContent>
      <VSpacer size={'small'} />
      <DialogActions>
        <OTPForm
          data-testid='otp-form'
          // TODO changed this prop after complete backend api
          isLoading={false}
          onClose={() => onClose()}
          onSubmit={async values => {
            // TODO added unassigned function after complete backend api endpoint
            // await closeDeal({ dso: dsoId, ...values })
            onClose()
          }}
        />
      </DialogActions>
    </MUIDialog>
  )
}

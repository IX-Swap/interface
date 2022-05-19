import React from 'react'
import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogProps,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material'
import useStyles from 'app/pages/admin/components/UnAssignCustodyDialog/UnAssignCustodyDialog.styles'
import { OTPForm } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPForm'
import { VSpacer } from 'components/VSpacer'
import { useUnAssignCustody } from 'app/pages/admin/hooks/useUnAssignCustody'
import { CloseDealArgs } from 'types/dso'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface UnAssignCustodyDialogProps extends Partial<DialogProps> {
  open?: boolean
  custodyAccountId: number
  onClose: () => void
}

export const UnAssignCustodyDialog = (props: UnAssignCustodyDialogProps) => {
  const theme = useTheme()
  const classes = useStyles()
  const { open = false, custodyAccountId, onClose } = props
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = async (values: CloseDealArgs) => {
    await unAssign({
      accountId: custodyAccountId,
      otp: values.otp
    })
    onClose()
  }

  const {
    mutation: [unAssign, { isLoading }]
  } = useUnAssignCustody()

  return (
    <UIDialog
      data-testid={'dialog'}
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => onClose()}
    >
      <DialogTitle>
        <Box pt={4} textAlign='center'>
          Are you sure you want to Unassign <br /> the Custody?
        </Box>
      </DialogTitle>
      <DialogContent style={{ overflowY: 'initial' }}>
        <Typography
          variant={'body1'}
          align={'center'}
          color={theme.palette.text.secondary}
        >
          Unassigning the custody will result in loss of tokens and user will
          not be
          <br /> able to use the same address again.
        </Typography>
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: -2
          }}
        >
          <Typography color={theme.palette.dialog.color}>OTP</Typography>
          <Typography color={theme.palette.text.secondary}>
            (code from authenticator)
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <OTPForm
          data-testid='otp-form'
          isLoading={isLoading}
          onClose={() => onClose()}
          onSubmit={handleSubmit}
          placeholder='______'
        />
      </DialogActions>
    </UIDialog>
  )
}

UnAssignCustodyDialog.defaultProps = {
  custodyAccountId: 0
}

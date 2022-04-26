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
import { Actions } from 'app/pages/invest/components/GetWalletDialog/Actions'
import useStyles from 'app/pages/invest/components/GetWalletDialog/GetWalletDialog.styles'
import { LoadingMessage } from 'app/pages/invest/components/GetWalletDialog/LoadingMessage'
import { DialogText } from 'app/pages/invest/components/GetWalletDialog/DialogText'
import { useCreateCustodianWallet } from 'app/pages/invest/hooks/useCreateCustodianWallet'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const GetWalletDialog = (props: ModalProps) => {
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const { user } = useAuth()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [createCustodianWallet, { isLoading }] = useCreateCustodianWallet({
    userId: getIdFromObj(user),
    onSuccess: () => toggleOpen(false),
    onError: () => toggleOpen(false)
  })

  const handleCreateWallet = async () => await createCustodianWallet()

  return (
    <UIDialog
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => toggleOpen(false)}
      aria-labelledby='getwallet-modal-title'
      aria-describedby='getwallet-modal-description'
    >
      <Box py={3} px={2.5}>
        <DialogTitle className={classes.titleRoot}>
          <Box justifyContent='center' alignItems='center'>
            <Typography variant='h6' component='span' align='center'>
              You need a custody wallet address to trade
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }}>
          <DialogText />
        </DialogContent>
        <DialogActions>
          <Box mt={1} width={1}>
            {isLoading ? (
              <LoadingMessage />
            ) : (
              <Actions action={handleCreateWallet} />
            )}
          </Box>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}

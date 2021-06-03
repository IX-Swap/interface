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
import { Actions } from './Actions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './GetWalletDialog.styles'
import { LoadingMessage } from './LoadingMessage'
import { DialogText } from './DialogText'
import { useCreateCustodianWallet } from '../../hooks/useCreateCustodianWallet'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  toggleOpen: Function
}

export const GetWalletDialog = (props: ModalProps) => {
  const { open = false, toggleOpen } = props
  const classes = useStyles()
  const theme = useTheme()
  const { user } = useAuth()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [createCustodianWallet, { isLoading }] = useCreateCustodianWallet({
    userId: getIdFromObj(user),
    onSuccess: () => toggleOpen(false)
  })

  const handleCreateWallet = async () => await createCustodianWallet()

  return (
    <MUIDialog
      maxWidth={'md'}
      fullWidth
      fullScreen={fullScreen}
      open={open}
      className={classes.root}
      onClose={() => toggleOpen(false)}
      onBackdropClick={() => toggleOpen(false)}
      aria-labelledby='getwallet-modal-title'
      aria-describedby='getwallet-modal-description'
    >
      <Box py={3} px={2.5}>
        <DialogTitle className={classes.titleRoot}>
          <Box justifyContent='center' alignItems='center'>
            <Typography variant='h6' component='span' align='center'>
              You need a custody wallet address to trade
            </Typography>
            <IconButton
              aria-label='close'
              onClick={() => toggleOpen(false)}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
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
    </MUIDialog>
  )
}

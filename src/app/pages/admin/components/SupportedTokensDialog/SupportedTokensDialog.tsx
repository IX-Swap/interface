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
  Button
} from '@material-ui/core'
import useStyles from 'app/pages/admin/components/SupportedTokensDialog/SupportedTokensDialog.styles'
import { VSpacer } from 'components/VSpacer'
import { CustodyAccountsListItem } from 'types/custodyAccount'

export interface ModalProps extends Partial<DialogProps> {
  open?: boolean
  custodyAccount: CustodyAccountsListItem | null
  onClose: () => void
}

export const SupportedTokensDialog = (props: ModalProps) => {
  const theme = useTheme()
  const classes = useStyles()
  const { open = false, onClose, custodyAccount } = props
  const handleClose = () => onClose()

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // TODO added get token info function after complete backend api endpoint
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
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby='close-deal-modal-title'
      aria-describedby='close-deal-modal-description'
    >
      <DialogTitle className={classes.titleRoot}>
        <Box justifyContent='center' alignItems='center'>
          <Typography
            variant='h4'
            component='span'
            align='center'
            className={classes.title}
          >
            Tokens Supported for the {custodyAccount?.name}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.contentWrapper}>
        <VSpacer size={'small'} />
        <Box
          alignItems='center'
          justifyContent='center'
          className={classes.content}
        >
          {/* TODO Remove fake info and added data from backend api when it will be complete */}
          <pre>{JSON.stringify(custodyAccount, null, 2)}</pre>
          <pre>{JSON.stringify(custodyAccount, null, 2)}</pre>
        </Box>
      </DialogContent>
      <VSpacer size={'small'} />
      <DialogActions className={classes.actions}>
        <Button
          size='large'
          color='primary'
          variant='contained'
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

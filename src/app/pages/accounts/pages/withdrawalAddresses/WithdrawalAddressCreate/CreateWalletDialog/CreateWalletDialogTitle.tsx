import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog.styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

export interface TitleProps {
  label: string
  onButtonCloseClick: () => void
}
export const CreateWalletDialogTitle = ({
  label,
  onButtonCloseClick,
  ...rest
}: TitleProps) => {
  const classes = useStyles()

  return (
    <DialogTitle disableTypography className={classes.title} {...rest}>
      {label}
      <IconButton
        aria-label='close'
        onClick={onButtonCloseClick}
        className={classes.closeBtn}
      >
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </DialogTitle>
  )
}

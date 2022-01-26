import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog.styles'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { CenteredDialogTitle } from 'ui/CenteredDialogTitle'

export interface CreateWalletDialogTitleProps {
  label: string
  onButtonCloseClick: () => void
}
export const CreateWalletDialogTitle = ({
  label,
  onButtonCloseClick,
  ...rest
}: CreateWalletDialogTitleProps) => {
  const classes = useStyles()

  return (
    <CenteredDialogTitle {...rest}>
      {label}
      <IconButton aria-label='close' onClick={onButtonCloseClick} size="large">
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </CenteredDialogTitle>
  );
}

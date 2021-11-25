import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog.styles'
import DialogTitle from '@material-ui/core/DialogTitle'

export interface TitleProps {
  label: string
}
export const WADialogTitle = ({ label, ...rest }: TitleProps) => {
  const classes = useStyles({})

  return (
    <DialogTitle disableTypography className={classes.title} {...rest}>
      {label}
    </DialogTitle>
  )
}

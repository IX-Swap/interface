import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog.styles'
import DialogTitle from '@mui/material/DialogTitle'

export interface TitleProps {
  label: string
}
export const WADialogTitle = ({ label, ...rest }: TitleProps) => {
  const classes = useStyles({})

  return (
    <DialogTitle className={classes.title} {...rest}>
      {label}
    </DialogTitle>
  )
}

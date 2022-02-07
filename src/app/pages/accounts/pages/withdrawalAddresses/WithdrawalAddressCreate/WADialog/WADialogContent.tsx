import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog.styles'
import DialogContent from '@mui/material/DialogContent'

export const WADialogContent: React.FC = ({ children, ...rest }) => {
  const classes = useStyles({})

  return (
    <DialogContent className={classes.content} {...rest}>
      {children}
    </DialogContent>
  )
}

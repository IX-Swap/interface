import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog.styles'
import { Link, Typography } from '@material-ui/core'

export interface TitleProps {
  label: string
  href: string
  icon: string
}
export const CreateWalletLink = ({ label, href, icon }: TitleProps) => {
  const classes = useStyles()

  return (
    <Link href={href} className={classes.link} target='_blank'>
      <Typography variant={'body2'} className={classes.linkText}>
        {label}
      </Typography>
      <img className={classes.icon} src={icon} alt={label} />
    </Link>
  )
}

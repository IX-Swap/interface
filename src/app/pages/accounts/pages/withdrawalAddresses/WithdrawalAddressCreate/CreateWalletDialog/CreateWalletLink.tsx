import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog.styles'
import { Box, Link, Tooltip, Typography } from '@material-ui/core'

export interface CreateWalletLinkProps {
  label: string
  href: string
  icon: string
  disabled: boolean
}

export const CreateWalletLink = ({
  label,
  href,
  icon,
  disabled
}: CreateWalletLinkProps) => {
  const classes = useStyles()

  if (disabled) {
    return (
      <Tooltip
        title={
          disabled ? (
            <Typography>
              Connection of other wallets to the platform is coming soon
            </Typography>
          ) : (
            false
          )
        }
      >
        <Box className={classes.link} style={{ opacity: 0.6 }}>
          <Typography variant='subtitle1' color='textSecondary'>
            {label}
          </Typography>
          <img className={classes.icon} src={icon} alt={label} />
        </Box>
      </Tooltip>
    )
  }

  return (
    <Link href={href} className={classes.link} target='_blank'>
      <Typography variant='subtitle1'>{label}</Typography>
      <img className={classes.icon} src={icon} alt={label} />
    </Link>
  )
}

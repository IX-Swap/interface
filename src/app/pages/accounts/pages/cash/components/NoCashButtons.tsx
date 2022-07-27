import { Button } from '@mui/material'
import { useVirtualAccounts } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useStyles } from 'app/pages/accounts/pages/cash/components/NoCashButtons.styles'
import React from 'react'

export const NoCashButtons = () => {
  const classes = useStyles()
  const { list: items, isLoading } = useVirtualAccounts()

  if (items?.length > 1 || isLoading) {
    return null
  }
  const necessaryAccounts = ['SGD', 'USD']
  const missingAccounts = necessaryAccounts.filter(
    currency => items?.find(item => currency === item?.currency) === undefined
  )

  return (
    <>
      {missingAccounts.map(account => {
        return (
          <Button className={classes.button} fullWidth>
            Add {account} account
          </Button>
        )
      })}
    </>
  )
}

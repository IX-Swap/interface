import { Button } from '@mui/material'
import { useVirtualAccounts } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useStyles } from 'app/pages/accounts/pages/cash/components/NoCashButtons.styles'
import React, { useState } from 'react'
import { AutoAssignVirtualAccount } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccount'

export const NoCashButtons = () => {
  const classes = useStyles()
  const { list: items, isLoading } = useVirtualAccounts()
  const [selectedCurrency, setSelectedCurrency] = useState<'SGD' | 'USD'>('SGD')
  const [open, setOpen] = useState(false)
  if (items?.length > 1 || isLoading) {
    return null
  }
  const necessaryAccounts: Array<'SGD' | 'USD'> = ['SGD', 'USD']
  const missingAccounts: Array<'SGD' | 'USD'> = necessaryAccounts.filter(
    currency => items?.find(item => currency === item?.currency) === undefined
  )
  const onClick = (currency: 'SGD' | 'USD') => {
    setSelectedCurrency(currency)
    setOpen(true)
  }
  return (
    <>
      {missingAccounts.map(account => {
        return (
          <>
            <Button
              className={classes.button}
              fullWidth
              onClick={() => onClick(account)}
            >
              Add {account} account
            </Button>
          </>
        )
      })}
      <AutoAssignVirtualAccount
        open={open}
        currency={selectedCurrency}
        handleOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
      />
    </>
  )
}

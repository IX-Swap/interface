import { Button } from '@mui/material'
import { useVirtualAccounts } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useStyles } from 'app/pages/accounts/pages/cash/components/NoCashButtons.styles'
import { useAuth } from 'hooks/auth/useAuth'
import React, { useState } from 'react'
import { useAssignVirtualAccount } from '../../banks/hooks/useAssignVirtualAccount'
import { AssignConfirmDialog } from './AutoAssignVirtualAccountForm/AssignConfirmDialog'

export const NoCashButtons = () => {
  const classes = useStyles()
  const { list: items, isLoading } = useVirtualAccounts()
  const [selectedCurrency, setSelectedCurrency] = useState<'SGD' | 'USD'>('SGD')
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const { user } = useAuth()
  const [assignVirtualAccount, { isLoading: loadingAssign }] =
    useAssignVirtualAccount(handleClose)

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

  const handleSubmit = async () => {
    await assignVirtualAccount({
      userId: user?._id,
      currency: selectedCurrency
    })
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
      <AssignConfirmDialog
        handleSubmit={handleSubmit}
        assigning={loadingAssign}
        open={open}
        currency={selectedCurrency}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

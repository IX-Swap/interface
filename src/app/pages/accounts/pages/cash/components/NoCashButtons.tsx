import { Button, Box } from '@mui/material'
import { useVirtualAccounts } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useStyles } from 'app/pages/accounts/pages/cash/components/NoCashButtons.styles'
import { useAuth } from 'hooks/auth/useAuth'
import React, { useState } from 'react'
import { useAssignVirtualAccount } from 'app/pages/accounts/pages/banks/hooks/useAssignVirtualAccount'
import { AssignConfirmDialog } from './AutoAssignVirtualAccountForm/AssignConfirmDialog'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Add } from '@mui/icons-material'

export const NoCashButtons = () => {
  const { isTablet } = useAppBreakpoints()
  const classes = useStyles()
  const { data: items, isLoading } = useVirtualAccounts()
  const [selectedCurrency, setSelectedCurrency] = useState<'SGD' | 'USD'>('SGD')
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const { user } = useAuth()
  const [assignVirtualAccount, { isLoading: loadingAssign }] =
    useAssignVirtualAccount(handleClose)

  //   if (items?.length > 1 || isLoading) {
  if (items?.length > 0 || isLoading) {
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
      <Box display={'flex'} justifyContent={'center'}>
        {missingAccounts.map(account => {
          return (
            <TwoFADialogWrapper>
              <Button
                className={classes.button}
                color='primary'
                disableElevation
                fullWidth={isTablet}
                key={account}
                variant='contained'
                onClick={() => onClick(account)}
                size='medium'
              >
                <Add sx={{ marginRight: 1 }} />
                <span>Add {account} account</span>
              </Button>
            </TwoFADialogWrapper>
          )
        })}
      </Box>
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

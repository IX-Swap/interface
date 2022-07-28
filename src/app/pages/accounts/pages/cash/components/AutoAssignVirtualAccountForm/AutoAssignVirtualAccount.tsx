import { useAssignVirtualAccount } from 'app/pages/accounts/pages/banks/hooks/useAssignVirtualAccount'
import { ConfirmationDialog } from 'app/pages/accounts/pages/cash/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
import { useAuth } from 'hooks/auth/useAuth'
import React from 'react'

interface AutoAssignVirtualAccountProps {
  handleOpen: () => void
  handleClose: () => void
  currency: 'USD' | 'SGD'
  open: boolean
}

export const AutoAssignVirtualAccount = ({
  open,
  handleClose,
  currency
}: AutoAssignVirtualAccountProps) => {
  const { user } = useAuth()

  const [assignVirtualAccount, { isLoading, isSuccess }] =
    useAssignVirtualAccount(handleClose)
  const handleSubmit = async () => {
    const args = {
      currency,
      userId: user?._id
    }
    await assignVirtualAccount(args)
  }

  return (
    <ConfirmationDialog
      onClose={handleClose}
      handleSubmit={handleSubmit}
      open={open}
      currency={currency}
      assigning={isLoading || isSuccess}
    />
  )
}

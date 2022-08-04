import { AutoAssignVirtualAccountFormFields } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountFormFields'
import { VirtualAssignConfirmationDialog } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/VirtualAssignConfirmationDialog'
import { useAssignVirtualAccount } from 'app/pages/accounts/pages/banks/hooks/useAssignVirtualAccount'
import { Form } from 'components/form/Form'
import React, { useState } from 'react'

export const AutoAssignVirtualAccountForm = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const [assignVirtualAccount, { isLoading, isSuccess }] =
    useAssignVirtualAccount(handleClose)
  const handleSubmit = async (args: any) => {
    await assignVirtualAccount(args)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <AutoAssignVirtualAccountFormFields handleOpen={handleOpen} />
      <VirtualAssignConfirmationDialog
        onClose={handleClose}
        open={open}
        assigning={isLoading || isSuccess}
      />
    </Form>
  )
}

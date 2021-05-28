import { Button, Grid } from '@material-ui/core'
import { AutoAssignVirtualAccountFormFields } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountFormFields'
import { ConfirmationDialog } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/ConfirmationDialog'
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
  const [
    assignVirtualAccount,
    { isLoading, isSuccess }
  ] = useAssignVirtualAccount(handleClose)
  const handleSubmit = async (args: any) => {
    await assignVirtualAccount(args)
  }

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ currency: 'SGD' }}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <AutoAssignVirtualAccountFormFields />
        </Grid>
        <Grid item>
          <Button
            onClick={handleOpen}
            type='button'
            variant='contained'
            color='primary'
            disableElevation
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
      <ConfirmationDialog
        onClose={handleClose}
        open={open}
        assigning={isLoading || isSuccess}
      />
    </Form>
  )
}

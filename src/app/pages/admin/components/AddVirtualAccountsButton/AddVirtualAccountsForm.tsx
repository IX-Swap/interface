import { Button } from '@material-ui/core'
import { AddVirtualAccountsFormFields } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsFormFields'
import { addVirtualAccountsValidationSchema } from 'app/pages/admin/components/AddVirtualAccountsButton/validation'
import { useAddVirtualAccount } from 'app/pages/admin/hooks/useAddVirtualAccounts'
import { Form } from 'components/form/Form'
import { FormDialogActions } from 'components/FormDialog/FormDialogActions'
import React from 'react'

export interface AddVirtualAccountsFormValues {
  to: string
  from: string
  currency: 'SGD' | 'USD'
}

export const defaultValues: any = {
  to: '',
  from: '',
  currency: 'SGD'
}

export interface AddVirtualAccountsFormProps {
  closeDialog: () => void
}

export const AddVirtualAccountsForm = ({
  closeDialog
}: AddVirtualAccountsFormProps) => {
  const [addVirtualAccount] = useAddVirtualAccount()
  const handleSubmit = async (values: any) => {
    const res = await addVirtualAccount(values)
    if (res?.status === 200) {
      closeDialog()
    }
  }

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      validationSchema={addVirtualAccountsValidationSchema}
    >
      <AddVirtualAccountsFormFields />
      <FormDialogActions>
        <Button type='button' onClick={closeDialog}>
          Close
        </Button>
        <Button
          type='submit'
          color='primary'
          disableElevation
          variant='contained'
        >
          Confirm
        </Button>
      </FormDialogActions>
    </Form>
  )
}

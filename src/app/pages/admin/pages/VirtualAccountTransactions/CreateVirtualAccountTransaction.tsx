import React from 'react'
import { useHistory } from 'react-router-dom'
import { DialogTitle, DialogContent, Typography } from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Form } from 'components/form/Form'
import { VirtualAccountsRoute } from '../../router/config'
import { CreateVirtualAccountTransactionFields } from './CreateVirtualAccountTransactionFields'
import { VirtualAccountTransactionFormValidationSchema } from './validation'
import {
  CreateVirtualAccountTransactionProps,
  useCreateVirtualAccountTransaction
} from '../../hooks/useCreateVirtualAccountTransaction'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const CreateVirtualAccountTransaction = () => {
  const { replace } = useHistory()
  const [createTransaction, { isLoading }] =
    useCreateVirtualAccountTransaction()
  const onClose = () => replace(VirtualAccountsRoute.transactions.list)

  const handleSubmit = async ({
    ...values
  }: CreateVirtualAccountTransactionProps) => {
    const { user, amount, type, reference } = values

    await createTransaction({
      user,
      amount,
      type,
      reference
    })
  }

  return (
    <UIDialog open onClose={onClose}>
      {isLoading && <LoadingIndicator />}
      <DialogTitle>
        <Typography variant='h3'>Create VA Transaction</Typography>
      </DialogTitle>
      <DialogContent sx={{ width: '600px', maxWidth: '100%' }}>
        <Form
          onSubmit={handleSubmit}
          validationSchema={VirtualAccountTransactionFormValidationSchema}
        >
          <CreateVirtualAccountTransactionFields onCancel={onClose} />
        </Form>
      </DialogContent>
    </UIDialog>
  )
}

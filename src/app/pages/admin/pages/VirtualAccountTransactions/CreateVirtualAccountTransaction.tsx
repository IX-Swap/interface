import React from 'react'
import { useHistory } from 'react-router-dom'
import { DialogTitle, DialogContent, Typography } from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Form } from 'components/form/Form'
import { VirtualAccountsRoute } from '../../router/config'
import { CreateVirtualAccountTransactionFields } from './CreateVirtualAccountTransactionFields'
import { VirtualAccountTransactionFormValues } from 'types/virtualAccountTransaction'
import { WhitelistWalletAddressFormValidationSchema } from './validation'
import { useAddToWhitelist } from '../../hooks/useAddToWhitelist'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const CreateVirtualAccountTransaction = () => {
  const { replace } = useHistory()
  const [addToWhitelist, { isLoading }] = useAddToWhitelist()
  const onClose = () => replace(VirtualAccountsRoute.transactions.list)

  const handleSubmit = async ({
    ...values
  }: VirtualAccountTransactionFormValues) => {
    const wallet = values.address.split('_')

    await addToWhitelist({
      address: wallet[0],
      userId: wallet[1] ?? '',
      assetId: values.assetId,
      label: values.label ?? ''
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
          validationSchema={WhitelistWalletAddressFormValidationSchema}
          defaultValues={{ label: '' }}
        >
          <CreateVirtualAccountTransactionFields onCancel={onClose} />
        </Form>
      </DialogContent>
    </UIDialog>
  )
}

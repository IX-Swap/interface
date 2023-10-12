import React from 'react'
import { useHistory } from 'react-router-dom'
import { DialogTitle, DialogContent, Typography } from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Form } from 'components/form/Form'
import { WhitelistWalletAddressesRoute } from '../../router/config'
import { WhitelistWalletAddressFields } from './WhitelistWalletAddressFields'
import { WhitelistWalletAddressFormValues } from 'types/whitelistWalletAddress'
import { WhitelistWalletAddressFormValidationSchema } from './validation'
import { useAddToWhitelist } from '../../hooks/useAddToWhitelist'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const AddToWhitelist = () => {
  const { replace } = useHistory()
  const [addToWhitelist, { isLoading }] = useAddToWhitelist()
  const onClose = () => replace(WhitelistWalletAddressesRoute.list)

  const handleSubmit = async ({
    ...values
  }: WhitelistWalletAddressFormValues) => {
    const wallet = values.address.split('_')

    await addToWhitelist({
      address: wallet[0],
      userId: wallet[1] ?? '',
      assetId: values.assetId,
      label: values.label ?? ''
    })
  }

  return (
    <>
      <UIDialog open onClose={onClose}>
        {isLoading && <LoadingIndicator />}
        <DialogTitle>
          <Typography variant='h3'>Add to Whitelist</Typography>
        </DialogTitle>
        <DialogContent sx={{ width: '600px', maxWidth: '100%' }}>
          <Form
            onSubmit={handleSubmit}
            validationSchema={WhitelistWalletAddressFormValidationSchema}
            defaultValues={{ label: '' }}
          >
            <WhitelistWalletAddressFields onCancel={onClose} />
          </Form>
        </DialogContent>
      </UIDialog>
    </>
  )
}

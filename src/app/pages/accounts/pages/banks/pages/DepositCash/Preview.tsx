import React from 'react'
import { GenericPreview } from 'app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'helpers/numbers'
import { INVESTAX_BANK } from 'config'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'app/pages/accounts/types'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { Alert } from '@mui/material';
import { VSpacer } from 'components/VSpacer'

export interface DepositTransactionPreviewProps {
  depositCode: string
}

export const Preview: React.FC<DepositTransactionPreviewProps> = props => {
  const { depositCode } = props
  const { watch } = useFormContext<DepositCashFormValues>()
  const { data } = useAssetsData('Currency')
  const assetId = watch('asset')
  const amount = watch('amount')
  const asset = data.map[assetId]

  const items = [
    {
      label: 'Deposit Code',
      value: depositCode,
      secret: true
    },
    {
      label: 'Account Number',
      value: INVESTAX_BANK.bankAccountNumber ?? ''
    },
    {
      label: 'Deposit Amount',
      value: formatMoney(amount, asset.numberFormat.currency)
    }
  ]

  return (
    <>
      <Alert severity='info'>
        Are you sure you want to continue with this transaction?
      </Alert>
      <VSpacer size='small' />
      <GenericPreview items={items} />
    </>
  )
}

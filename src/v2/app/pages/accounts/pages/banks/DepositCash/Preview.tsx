import React from 'react'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { formatMoney } from 'v2/helpers/numbers'
import { INVESTAX_BANK } from 'v2/config'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { Alert } from '@material-ui/lab'
import { VSpacer } from 'v2/components/VSpacer'

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

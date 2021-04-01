import React from 'react'
import { useParams } from 'react-router-dom'
import { INVESTAX_BANK } from 'config'
import { formatMoney } from 'helpers/numbers'
import { GenericPreview } from 'app/components/GenericPreview/GenericPreview'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'app/pages/accounts/types'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { Alert } from '@material-ui/lab'
import { VSpacer } from 'components/VSpacer'

export const Summary: React.FC = () => {
  const params = useParams<{ balanceId: string }>()
  const { watch } = useFormContext<WithdrawDSFormValues>()
  const amount = watch('amount')
  const memo = watch('memo')
  const { data: balances, status: balancesStatus } = useAllBalances()
  const { data: assets, status: assetsStatus } = useAssetsData('Security')

  if (balancesStatus === 'loading' || assetsStatus === 'loading') {
    return null
  }

  const asset = assets.map[balances.map[params.balanceId].assetId]
  const items = [
    {
      label: 'Name of Token',
      value: asset.name,
      secret: true
    },
    {
      label: 'Withdrawal Amount',
      value: formatMoney(amount, asset.numberFormat.currency),
      secret: true
    },
    {
      label: 'Account Number',
      value: INVESTAX_BANK.bankAccountNumber ?? ''
    }
  ]

  if (memo !== undefined) {
    items.push({
      label: 'Memo',
      value: memo,
      secret: true
    })
  }

  return (
    <>
      <Alert severity='info'>
        Are you sure you want to continue with this transaction?
      </Alert>
      <VSpacer size='small' />
      <GenericPreview items={items} />
      <VSpacer size='small' />
    </>
  )
}

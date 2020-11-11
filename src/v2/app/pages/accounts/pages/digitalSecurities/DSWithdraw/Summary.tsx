import React from 'react'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import { GenericPreview } from 'v2/app/components/GenericPreview/GenericPreview'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { Alert } from '@material-ui/lab'
import { VSpacer } from 'v2/components/VSpacer'

export const Summary: React.FC = () => {
  const {
    params: { balanceId }
  } = useDSRouter()
  const { watch } = useFormContext<WithdrawDSFormValues>()
  const amount = watch('amount')
  const memo = watch('memo')
  const { data: balances, status: balancesStatus } = useAllBalances()
  const { data: assets, status: assetsStatus } = useAssetsData('Security')

  if (balancesStatus === 'loading' || assetsStatus === 'loading') {
    return null
  }

  const asset = assets.map[balances.map[balanceId].assetId]
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
      value: INVESTAX_BANK.bankAccountNumber ?? '',
      secret: true
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

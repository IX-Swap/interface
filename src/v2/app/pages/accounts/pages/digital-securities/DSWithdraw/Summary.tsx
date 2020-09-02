import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { INVESTAX_BANK } from 'v2/config'
import { formatMoney } from 'v2/helpers/numbers'
import GenericPreview from 'v2/app/components/generic-preview'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'v2/context/balances/useAllBalances'
import { useAssetsData } from 'v2/context/assets/useAssetsData'

export const Summary: React.FC = () => {
  const { balanceId } = useParams<{ balanceId: string }>()
  const { getValues } = useFormContext<WithdrawDSFormValues>()
  const { memo, amount } = getValues()
  const { data: balances, status: balancesStatus } = useAllBalances()
  const { data: assets, status: assetsStatus } = useAssetsData('Security')
  const asset = assets.map[balances.map[balanceId].assetId]

  if (balancesStatus === 'loading' || assetsStatus === 'loading') {
    return null
  }

  const items = [
    {
      label: 'Name of Token',
      value: asset.name
    },
    {
      label: 'Withdrawal Amount',
      value: formatMoney(amount, asset.numberFormat.currency)
    },
    {
      label: 'Account Number',
      value: INVESTAX_BANK.bankAccountNumber ?? ''
    }
  ]

  if (memo !== undefined) {
    items.push({
      label: 'Memo',
      value: memo
    })
  }

  return (
    <>
      <Box p={2}>
        <Typography variant='subtitle1' align='center'>
          <b>Are you sure you want to continue with this transaction?</b>
        </Typography>
      </Box>
      <GenericPreview items={items} />
    </>
  )
}

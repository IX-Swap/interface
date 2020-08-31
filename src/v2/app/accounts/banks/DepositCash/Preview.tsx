import React from 'react'
import { Box, Typography } from '@material-ui/core'
import GenericPreview from 'v2/app/components/generic-preview'
import { formatMoney } from 'v2/helpers/numbers'
import { INVESTAX_BANK } from 'v2/config'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/accounts/types'
import { useAssets } from 'v2/context/assets/useAssets'

export interface DepositTransactionPreviewProps {
  depositCode: string
}

export const Preview: React.FC<DepositTransactionPreviewProps> = props => {
  const { depositCode } = props
  const { getValues } = useFormContext<DepositCashFormValues>()
  const { data } = useAssets('Currency')
  const { asset: assetId, amount } = getValues()
  const asset = data.map[assetId]

  const items = [
    {
      label: 'Deposit Code',
      value: depositCode
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
      <Box p={2}>
        <Typography variant='subtitle1' align='center'>
          <b>Are you sure you want to continue with this transaction?</b>
        </Typography>
      </Box>
      <GenericPreview items={items} />
    </>
  )
}

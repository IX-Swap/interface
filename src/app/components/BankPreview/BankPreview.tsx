import React from 'react'
import { Grid } from '@mui/material'
import { Bank } from 'types/bank'
import { convertAddressToString } from 'app/pages/authorizer/components/utils'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface BankViewProps {
  data: Bank
}

export const BankPreview: React.FC<BankViewProps> = ({ data }) => {
  useSetPageTitle(data?.bankName)

  if (data === null) {
    return null
  }

  const items = [
    {
      label: 'Bank Name',
      value: data.bankName
    },
    {
      label: 'Account Holder Name',
      value: data.accountHolderName
    },
    {
      label: 'Currency',
      value: data.currency.symbol
    },
    {
      label: 'Bank Account Number',
      value: data.bankAccountNumber
    },
    {
      label: 'Swift Code',
      value: data.swiftCode
    },
    {
      label: 'Bank Address',
      value: convertAddressToString(data.address)
    }
  ]

  return (
    <Grid container pt={3} pl={3}>
      <Grid item xs={12}>
        <FieldGrid items={items} />
      </Grid>
    </Grid>
  )
}

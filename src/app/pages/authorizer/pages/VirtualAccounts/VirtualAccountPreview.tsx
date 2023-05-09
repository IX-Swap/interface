import React from 'react'
import { Grid } from '@mui/material'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { VirtualAccount } from 'types/virtualAccount'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface VirtualAccountPreviewProps {
  data: VirtualAccount
}

export const VirtualAccountPreview = (props: VirtualAccountPreviewProps) => {
  const { data } = props

  useSetPageTitle(data.accountNumber)

  const items = [
    {
      label: 'Requested Virtual Account',
      value: data.accountNumber
    },
    {
      label: 'Account Holder Name',
      value: data.user?.name
    },
    {
      label: 'Currency',
      value: data.currency
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

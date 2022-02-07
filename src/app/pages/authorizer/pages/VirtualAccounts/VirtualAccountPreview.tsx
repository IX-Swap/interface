import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { VirtualAccount } from 'types/virtualAccount'

export interface VirtualAccountPreviewProps {
  data: VirtualAccount
}

export const VirtualAccountPreview = (props: VirtualAccountPreviewProps) => {
  const { data } = props

  useSetPageTitle(data.accountNumber)

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LabelledValue
          label='Requested Virtual Account'
          value={data.accountNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelledValue label='Account Holder Name' value={data.user?.name} />
      </Grid>

      <Grid item xs={6}>
        <LabelledValue label='Currency' value={data.currency} />
      </Grid>
    </Grid>
  )
}

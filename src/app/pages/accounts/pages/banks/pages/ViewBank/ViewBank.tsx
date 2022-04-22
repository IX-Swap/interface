import React from 'react'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'

const ViewBank = () => {
  const params = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()

  if (status === 'loading' || params.bankId === undefined) {
    return null
  }

  const bank = data.map[params.bankId]

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title={bank.bankName} />
      </Grid>
      <Grid item>
        <RejectionMessage data={bank} />
      </Grid>
      <Grid item>
        <BankPreview data={bank} />
      </Grid>
    </Grid>
  )
}

export default ViewBank

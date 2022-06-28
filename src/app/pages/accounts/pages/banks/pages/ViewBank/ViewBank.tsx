import React from 'react'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

const ViewBank = () => {
  const params = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()

  if (status === 'loading' || params.bankId === undefined) {
    return null
  }

  const bank = data.map[params.bankId]

  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={bank.bankName} />
      </Grid>
      <RootContainer>
        <Grid item>
          <RejectionMessage data={bank} />
        </Grid>
        <Grid item>
          <BankPreview data={bank} />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

export default ViewBank

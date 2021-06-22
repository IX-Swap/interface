import React from 'react'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

const ViewBank = () => {
  const params = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()
  const bank = data.map[params.bankId]

  if (status === 'loading') {
    return null
  }

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

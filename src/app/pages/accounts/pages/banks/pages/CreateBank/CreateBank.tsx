import React from 'react'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { useCreateBank } from 'app/pages/accounts/pages/banks/hooks/useCreateBank'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'

export const CreateBank: React.FC = () => {
  const [createBank] = useCreateBank()

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Add Bank Account' />
      </Grid>
      <Grid item>
        <BankForm submitButtonLabel='Add Bank Account' onSubmit={createBank} />
      </Grid>
    </Grid>
  )
}

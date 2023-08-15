import React from 'react'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { useCreateBank } from 'app/pages/accounts/pages/banks/hooks/useCreateBank'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const CreateBank: React.FC = () => {
  const [createBank] = useCreateBank()

  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Add Bank Account' />
      </Grid>
      <RootContainer>
        <Grid item>
          <BankForm
            submitButtonLabel='Add Bank Account'
            onSubmit={createBank}
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

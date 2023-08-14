import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VirtualAccountsAuditTabView } from 'app/pages/admin/components/VirtualAccountAuditTabView/VirtualAccountsAuditTabView'
import { RootContainer } from 'ui/RootContainer'

export const VirtualAccountAudit = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Virtual Account Audit' />
      </Grid>
      <RootContainer>
        <Grid item>
          <VirtualAccountsAuditTabView />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

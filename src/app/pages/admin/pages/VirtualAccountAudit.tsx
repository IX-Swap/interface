import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VirtualAccountsAuditTabView } from 'app/pages/admin/components/VirtualAccountAuditTabView/VirtualAccountsAuditTabView'

export const VirtualAccountAudit = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Account Audit' />
      </Grid>
      <Grid item>
        <VirtualAccountsAuditTabView />
      </Grid>
    </Grid>
  )
}

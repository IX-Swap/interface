import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VirtualAccountsAuditTabView } from 'app/pages/admin/components/VirtualAccountAuditTabView/VirtualAccountsAuditTabView'
import { VAAuditFilters } from 'app/pages/admin/components/VAAuditFilters'
import { VSpacer } from 'components/VSpacer'
import { RootContainer } from 'ui/RootContainer'

export const VirtualAccountAudit = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Virtual Account Audit' />
        <VSpacer size={'medium'} />
      </Grid>
      <RootContainer>
        <VAAuditFilters />
        <Grid item>
          <VSpacer size={'medium'} />
          <VirtualAccountsAuditTabView />
        </Grid>
      </RootContainer>
    </Grid>
  )
}

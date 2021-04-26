import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { UnassignedAccountsTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountsTable'
import { SelectionHelper } from 'components/SelectionHelper'
import { VirtualAccount as VirtualAccountType } from 'types/virtualAccount'

export const itemComparator = (
  a: VirtualAccountType,
  b: VirtualAccountType
) => {
  return a._id === b._id
}

export const VirtualAccounts = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Accounts' />
      </Grid>
      <VSpacer size='small' />
      <SelectionHelper itemComparator={itemComparator}>
        <Grid item>
          <UnassignedAccountsTable />
        </Grid>
      </SelectionHelper>
    </Grid>
  )
}

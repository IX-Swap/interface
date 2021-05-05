import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { SelectionHelper } from 'components/SelectionHelper'
import { VirtualAccount as VirtualAccountType } from 'types/virtualAccount'
import { VirtualAccountsTabView } from 'app/pages/admin/components/VirtualAccountsTabView/VirtualAccountsTabView'
import { AddVirtualAccountsButton } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsButton'
import { VirtualAccountsStats } from 'app/pages/admin/components/VirtualAccountsStats/VirtualAccountsStats'

export const itemComparator = (
  a: VirtualAccountType,
  b: VirtualAccountType
) => {
  return a._id === b._id
}

export const VirtualAccounts = () => {
  return (
    <Grid container direction='column' spacing={5}>
      <Grid item>
        <PageHeader title='Virtual Accounts' />
      </Grid>
      <Grid item>
        <VirtualAccountsStats />
      </Grid>
      <Grid item>
        <AddVirtualAccountsButton />
      </Grid>
      <SelectionHelper itemComparator={itemComparator}>
        <Grid item>
          <VirtualAccountsTabView />
        </Grid>
      </SelectionHelper>
    </Grid>
  )
}

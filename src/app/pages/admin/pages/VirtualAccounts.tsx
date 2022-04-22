import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { SelectionHelper } from 'components/SelectionHelper'
import {
  VirtualAccount,
  VirtualAccount as VirtualAccountType
} from 'types/virtualAccount'
import { VirtualAccountsTabView } from 'app/pages/admin/components/VirtualAccountsTabView/VirtualAccountsTabView'
import { AddVirtualAccountsButton } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsButton'
import { VirtualAccountsStats } from 'app/pages/admin/components/VirtualAccountsStats/VirtualAccountsStats'
import { DisableAccountsButton } from 'app/pages/admin/components/DisableAccountsButton/DisableAccountsButton'
import { UploadCSVButton } from 'app/pages/admin/components/UploadCSVButton/UploadCSVButton'

export const itemComparator = (
  a: VirtualAccountType,
  b: VirtualAccountType
) => {
  return a._id === b._id
}

export const VirtualAccounts = () => {
  return (
    <SelectionHelper<VirtualAccount> itemComparator={itemComparator}>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <PageHeader title='Virtual Accounts' />
        </Grid>
        <Grid item>
          <VirtualAccountsStats />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <AddVirtualAccountsButton />
          </Grid>
          <Grid item>
            <DisableAccountsButton />
          </Grid>
          <Grid item>
            <UploadCSVButton />
          </Grid>
        </Grid>
        <Grid item>
          <VirtualAccountsTabView />
        </Grid>
      </Grid>
    </SelectionHelper>
  )
}

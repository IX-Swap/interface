import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { UnassignedAccountTable } from 'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountTable'
import { SelectionHelper } from 'components/SelectionHelper'
import { VirtualAccount as VirtualAccountType } from 'types/virtualAccount'

export const VirtualAccounts = () => {
  const itemComparator = (a: VirtualAccountType, b: VirtualAccountType) => {
    return a._id === b._id
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Virtual Accounts' />
      </Grid>
      <VSpacer size='small' />
      <SelectionHelper itemComparator={itemComparator}>
        <Grid item>
          <UnassignedAccountTable />
        </Grid>
      </SelectionHelper>
    </Grid>
  )
}

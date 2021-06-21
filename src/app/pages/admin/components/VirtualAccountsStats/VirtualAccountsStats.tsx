import { Grid } from '@material-ui/core'
import { StatCard } from 'app/pages/admin/components/StatCard/StatCard'
import { useServices } from 'hooks/useServices'
import React from 'react'
import { useQuery } from 'react-query'
import { ReactComponent as TotalIcon } from 'assets/icons/virtual-accounts/total.svg'
import { ReactComponent as AssignedIcon } from 'assets/icons/virtual-accounts/assigned.svg'
import { ReactComponent as UnassignedIcon } from 'assets/icons/virtual-accounts/unassigned.svg'
import { CurrencyInfo } from 'app/pages/admin/components/VirtualAccountsStats/CurrencyInfo'

export const VirtualAccountsStats = () => {
  const { apiService } = useServices()
  const { data, isLoading } = useQuery('virtual-accounts-stats', async () => {
    return await apiService.get('/virtual-accounts/stats')
  })

  if (isLoading || data === undefined) {
    return null
  }

  const stats: any = data.data // TODO: fix typings

  return (
    <Grid container spacing={3}>
      <Grid item>
        <StatCard
          title='Total Virtual Accounts'
          value={stats.total.count}
          icon={TotalIcon}
          secondaryInfo={
            <CurrencyInfo
              sgd={stats.total.currencies.SGD?.count ?? 0}
              usd={stats.total.currencies.USD?.count ?? 0}
            />
          }
        />
      </Grid>

      <Grid item>
        <StatCard
          title='Total Assigned Accounts'
          value={stats.totalAssigned.count}
          icon={AssignedIcon}
          secondaryInfo={
            <CurrencyInfo
              sgd={stats.totalAssigned.currencies.SGD?.count ?? 0}
              usd={stats.totalAssigned.currencies.USD?.count ?? 0}
            />
          }
        />
      </Grid>

      <Grid item>
        <StatCard
          title='Unassigned Accounts'
          value={stats.totalUnassigned.count}
          icon={UnassignedIcon}
          secondaryInfo={
            <CurrencyInfo
              sgd={stats.totalUnassigned.currencies.SGD?.count ?? 0}
              usd={stats.totalUnassigned.currencies.USD?.count ?? 0}
            />
          }
        />
      </Grid>
    </Grid>
  )
}

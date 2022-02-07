import React from 'react'
import { ReactComponent as TotalIdentityIcon } from 'assets/icons/total-identity.svg'
import { ReactComponent as TotalUsersWithoutIdentityIcon } from 'assets/icons/user-search.svg'
import { ReactComponent as TotalUsersIcon } from 'assets/icons/users.svg'
import { Grid } from '@mui/material'
import { StatCard } from 'app/pages/admin/components/StatCard/StatCard'
import { useIdentityStats } from 'app/pages/admin/hooks/useIdentityStats'
import { UpFromLastWeek } from 'app/pages/admin/components/IdentityStatsCards/UpFromLastWeek'

export const IdentityStatsCards = () => {
  const { data, isLoading } = useIdentityStats()

  if (isLoading || data === undefined) {
    return null
  }

  const stats = [
    {
      title: 'Total Identity Created',
      value: data.identity.total,
      icon: TotalIdentityIcon,
      secondaryInfo: <UpFromLastWeek value={data.identity.totalLastWeek} />
    },
    {
      title: 'Users Without Identity',
      value: data.userWithoutIdentity.total,
      icon: TotalUsersWithoutIdentityIcon,
      secondaryInfo: (
        <UpFromLastWeek value={data.userWithoutIdentity.totalLastWeek} />
      )
    },
    {
      title: 'Total Users',
      value: data.user.total,
      icon: TotalUsersIcon,
      secondaryInfo: <UpFromLastWeek value={data.user.totalLastWeek} />
    }
  ]

  return (
    <Grid container spacing={6}>
      {stats.map(stat => (
        <Grid item key={stat.title}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  )
}

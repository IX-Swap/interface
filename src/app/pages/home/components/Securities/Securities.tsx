import { Grid } from '@material-ui/core'
import { Filters } from 'app/pages/home/components/Securities/Filters'
import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { useSecurities } from 'app/pages/home/hooks/useSecurities'
import React from 'react'

export const Securities = () => {
  const { data, isLoading } = useSecurities()

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Filters />
      </Grid>
      <Grid item xs={12}>
        <SecuritiesGrid data={data} isLoading={isLoading} />
      </Grid>
    </Grid>
  )
}

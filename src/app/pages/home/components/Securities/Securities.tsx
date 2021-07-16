import { Grid } from '@material-ui/core'
import { Filters } from 'app/pages/home/components/Securities/Filters'
import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { SecuritiesTableView } from 'app/pages/home/components/Securities/SecuritiesTableView'
import { useSecurities } from 'app/pages/home/hooks/useSecurities'
import { useToggleView } from 'app/pages/home/hooks/useToggleView'
import React from 'react'

export const Securities = () => {
  const { data, isLoading } = useSecurities()
  const { view, toggleView } = useToggleView()

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Filters view={view} toggleView={toggleView} />
      </Grid>
      <Grid item xs={12}>
        {view === 'grid' ? (
          <SecuritiesGrid data={data} isLoading={isLoading} />
        ) : (
          <SecuritiesTableView data={data} isLoading={isLoading} />
        )}
      </Grid>
    </Grid>
  )
}

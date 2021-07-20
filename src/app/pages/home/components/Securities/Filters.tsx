import { Grid, IconButton } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CountryFilter } from 'app/pages/home/components/Securities/CountryFilter'
import { IndustryFilter } from 'app/pages/home/components/Securities/IndustryFilter'
import { ProtocolFilter } from 'app/pages/home/components/Securities/ProtocolFilter'
import { SecurityTypeFilter } from 'app/pages/home/components/Securities/SecurityTypeFilter'
import AppsIcon from '@material-ui/icons/Apps'
import ViewListIcon from '@material-ui/icons/ViewList'
import React from 'react'

export interface FiltersProps {
  view: 'grid' | 'list'
  toggleView: () => void
  showViewToggle?: boolean
}

export const Filters = ({
  view,
  toggleView,
  showViewToggle = false
}: FiltersProps) => {
  return (
    <Grid container spacing={0} justify='space-between'>
      <Grid item xs={12} md={4}>
        <SearchFilter
          inputAdormentPosition='end'
          placeholder='Search'
          fullWidth
        />
      </Grid>
      <Grid
        xs={12}
        md={6}
        item
        container
        spacing={2}
        justify='flex-end'
        wrap='nowrap'
      >
        <Grid item>
          <IndustryFilter />
        </Grid>
        <Grid item>
          <SecurityTypeFilter />
        </Grid>
        <Grid item>
          <CountryFilter />
        </Grid>
        <Grid item>
          <ProtocolFilter />
        </Grid>
        {showViewToggle && (
          <Grid item>
            <IconButton onClick={toggleView}>
              {view === 'grid' ? <AppsIcon /> : <ViewListIcon />}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

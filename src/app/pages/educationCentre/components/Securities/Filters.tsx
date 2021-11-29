import { Grid, IconButton } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CountryFilter } from 'app/pages/educationCentre/components/Securities/CountryFilter'
import { IndustryFilter } from 'app/pages/educationCentre/components/Securities/IndustryFilter'
import { ProtocolFilter } from 'app/pages/educationCentre/components/Securities/ProtocolFilter'
import { SecurityTypeFilter } from 'app/pages/educationCentre/components/Securities/SecurityTypeFilter'
import AppsIcon from '@material-ui/icons/Apps'
import ViewListIcon from '@material-ui/icons/ViewList'
import React from 'react'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

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
  const { isMiniLaptop } = useAppBreakpoints()
  return (
    <Grid container spacing={2} justify='space-between'>
      <Grid item xs={12} lg={4}>
        <SearchFilter
          inputAdornmentPosition='end'
          placeholder='Search'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Grid
          container
          spacing={2}
          justify={isMiniLaptop ? 'flex-start' : 'flex-end'}
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
    </Grid>
  )
}

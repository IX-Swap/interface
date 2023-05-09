import AppsIcon from '@mui/icons-material/Apps'
import ViewListIcon from '@mui/icons-material/ViewList'
import { Grid, IconButton } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { CountryFilter } from 'app/pages/educationCentre/components/Securities/CountryFilter'
import { IndustryFilter } from 'app/pages/educationCentre/components/Securities/IndustryFilter'
import { ProtocolFilter } from 'app/pages/educationCentre/components/Securities/ProtocolFilter'
import { SecurityTypeFilter } from 'app/pages/educationCentre/components/Securities/SecurityTypeFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
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
  const { isMiniLaptop } = useAppBreakpoints()
  return (
    <Grid
      container
      spacing={2}
      justifyContent='space-between'
      alignItems={'center'}
    >
      <Grid item xs={12} lg={4} mt={3}>
        <TextInputSearchFilter
          inputAdornmentPosition='end'
          placeholder='Search'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <Grid
          container
          spacing={2}
          justifyContent={isMiniLaptop ? 'flex-start' : 'flex-end'}
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
              <IconButton onClick={toggleView} size='large'>
                {view === 'grid' ? <AppsIcon /> : <ViewListIcon />}
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
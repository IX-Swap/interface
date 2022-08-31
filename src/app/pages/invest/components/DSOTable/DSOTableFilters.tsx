import { Button, Grid, Paper, Typography } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { NetworkFilter } from 'app/pages/invest/components/DSOTable/NetworkFilter'
import { PriceFilter } from 'app/pages/invest/components/DSOTable/PriceFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { FavoriteFilter } from 'app/pages/invest/components/DSOTable/FavoriteFilter'
import { CurrencyFilter } from 'app/pages/invest/components/DSOTable/CurrencyFilter'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const DSOTableFilters = () => {
  const { isMiniLaptop, isTablet } = useAppBreakpoints()
  const { removeFilters } = useQueryFilter()

  const clearAll = () => {
    removeFilters([
      'isFavorite',
      'isPriceAscending',
      'search',
      'capitalStructure',
      'currency',
      'network',
      'sortField',
      'sortOrder'
    ])
  }

  return (
    <Grid container spacing={isMiniLaptop ? 2 : 1}>
      <Grid item xs={12} md={2}>
        <CapitalStructureFilter />
      </Grid>
      <Grid item xs={12} md={10}>
        <TextInputSearchFilter fullWidth placeholder='Search' />
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ borderRadius: 1, p: 3 }}>
          <Grid container spacing={1}>
            <Grid
              item
              container
              justifyContent='space-between'
              alignItems='center'
              xs={12}
            >
              <Grid item>
                <Typography variant='h4'>Filters</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='text'
                  onClick={clearAll}
                  sx={{ pr: 0, backgroundColor: 'transparent !important' }}
                >
                  Clear all
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              wrap='nowrap'
              spacing={1}
              direction={isTablet ? 'column' : 'row'}
            >
              <Grid item sx={{ width: '100%' }} container spacing={1}>
                <Grid item xs={12} md={4}>
                  <PriceFilter />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CurrencyFilter />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NetworkFilter />
                </Grid>
              </Grid>
              <Grid item>
                <FavoriteFilter />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

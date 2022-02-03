import React, { useState } from 'react'
import { Button, Grid, Hidden } from '@mui/material'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { useDSOTableColumns } from 'app/pages/invest/hooks/useDSOTableColumns'
import { SearchFilter } from 'app/components/SearchFilter'
import { ColumnsEditorToggle } from 'app/pages/invest/components/DSOTable/ColumnsEditorToggle'
import { ColumnsEditor } from 'app/pages/invest/components/DSOTable/ColumnsEditor'
import { LabelledValue } from 'components/LabelledValue'
import { PriceFilter } from 'app/pages/invest/components/DSOTable/PriceFilter'
import { NetworkFilter } from 'app/pages/invest/components/DSOTable/NetworkFilter'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import { useTheme } from '@mui/material/styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import FilterListIcon from '@mui/icons-material/FilterList'

export const DSOTableFilters = () => {
  const { deselectColumn, selectColumn, columns } = useDSOTableColumns()
  const [showColumns, setShowColumns] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const toggleColumns = () => setShowColumns(!showColumns)
  const toggleFilters = () => setShowFilters(!showFilters)

  const theme = useTheme()

  const { isMobile, isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={isMiniLaptop ? 2 : 0}>
        <Grid item xs={12} md={10}>
          <SearchFilter
            style={{
              borderTopRightRadius: isMobile ? theme.spacing(0.5) : 0,
              borderBottomRightRadius: isMobile ? theme.spacing(0.5) : 0
            }}
            fullWidth
            placeholder='Search Offers'
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <CapitalStructureFilter />
        </Grid>
        <Hidden mdUp>
          <Grid item xs={6}>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              fullWidth
              onClick={toggleFilters}
              style={{
                color: theme.palette.primary.main,
                backgroundColor: '#E4EDFF',
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: showFilters
                  ? theme.palette.primary.main
                  : 'transparent'
              }}
              endIcon={<FilterListIcon />}
            >
              More Filters
            </Button>
          </Grid>
        </Hidden>
      </Grid>
      {(!isMiniLaptop || showFilters) && (
        <Grid item container spacing={isMiniLaptop ? 1 : 4}>
          <Grid item xs={6} md={'auto'}>
            <LabelledValue
              row
              alignItems={'center'}
              label={'Price'}
              value={<PriceFilter />}
            />
          </Grid>
          <Grid item xs={6} md={'auto'}>
            <LabelledValue
              row
              alignItems={'center'}
              label={'Currency'}
              value={
                <Grid container spacing={1}>
                  <Grid item>
                    <CurrencyFilter defaultValue={null} currency={'SGD'} />
                  </Grid>
                  <Grid item>
                    <CurrencyFilter defaultValue={null} currency={'USD'} />
                  </Grid>
                </Grid>
              }
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <NetworkFilter />
          </Grid>
          <Hidden lgDown>
            <Grid item xs={6} md={2}>
              <ColumnsEditorToggle
                value='columns'
                onClick={toggleColumns}
                selected={showColumns}
              />
            </Grid>
          </Hidden>
        </Grid>
      )}

      {showColumns && (
        <Grid item>
          <ColumnsEditor
            selected={columns}
            onSelect={selectColumn}
            onDeselect={deselectColumn}
          />
        </Grid>
      )}
    </Grid>
  )
}

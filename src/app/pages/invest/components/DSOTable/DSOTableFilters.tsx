import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { useDSOTableColumns } from 'app/pages/invest/hooks/useDSOTableColumns'
import { SearchFilter } from 'app/components/SearchFilter'
import { ColumnsEditorToggle } from 'app/pages/invest/components/DSOTable/ColumnsEditorToggle'
import { ColumnsEditor } from 'app/pages/invest/components/DSOTable/ColumnsEditor'
import { LabelledValue } from 'components/LabelledValue'
import { PriceFilter } from 'app/pages/invest/components/DSOTable/PriceFilter'
import { NetworkFilter } from 'app/pages/invest/components/DSOTable/NetworkFilter'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export const DSOTableFilters = () => {
  const { deselectColumn, selectColumn, columns } = useDSOTableColumns()
  const [showColumns, setShowColumns] = useState(false)
  const toggleColumns = () => setShowColumns(value => !value)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={isMobile ? 4 : 0}>
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

        <Grid item xs={12} md={2}>
          <CapitalStructureFilter />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
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
              <Grid container>
                <Grid>
                  <CurrencyFilter defaultValue={null} currency={'SGD'} />
                </Grid>
                <Grid style={{ marginLeft: theme.spacing(1) }}>
                  <CurrencyFilter defaultValue={null} currency={'USD'} />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <NetworkFilter />
        </Grid>
        <Grid item xs={6} md={2}>
          <ColumnsEditorToggle onClick={toggleColumns} selected={showColumns} />
        </Grid>
      </Grid>

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

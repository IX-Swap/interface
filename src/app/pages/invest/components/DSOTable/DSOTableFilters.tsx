import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { useDSOTableColumns } from 'app/pages/invest/hooks/useDSOTableColumns'
import { SearchFilter } from 'app/pages/invest/components/DSOTable/SearchFilter'
import { ColumnsEditorToggle } from 'app/pages/invest/components/DSOTable/ColumnsEditorToggle'
import { ColumnsEditor } from 'app/pages/invest/components/DSOTable/ColumnsEditor'

export const DSOTableFilters = () => {
  const { deselectColumn, selectColumn, columns } = useDSOTableColumns()
  const [showColumns, setShowColumns] = useState(false)
  const toggleColumns = () => setShowColumns(value => !value)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={2}>
        <Grid item xs={12} md={8}>
          <SearchFilter fullWidth placeholder='Search Offers' />
        </Grid>

        <Grid item xs={6} md={2}>
          <CapitalStructureFilter />
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

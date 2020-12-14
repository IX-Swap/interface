import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { SearchFilter } from './SearchFilter'
import { useDSOTableColumns } from '../../hooks/useDSOTableColumns'
import { ColumnsEditor } from './ColumnsEditor'
import { ColumnsEditorToggle } from './ColumnsEditorToggle'

export const DSOTableFilters = () => {
  const { deselectColumn, selectColumn, columns } = useDSOTableColumns()
  const [showColumns, setShowColumns] = useState(false)
  const toggleColumns = () => setShowColumns(value => !value)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={2}>
        <Grid item md={10}>
          <SearchFilter fullWidth placeholder='Search Offers' />
        </Grid>

        <Grid item md={2}>
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

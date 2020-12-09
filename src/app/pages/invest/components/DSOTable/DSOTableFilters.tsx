import { Grid } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import React from 'react'

export interface DSOTableFiltersProps {
  showColumns: boolean
  toggleColumns: () => void
}

export const DSOTableFilters = (props: DSOTableFiltersProps) => {
  const { showColumns, toggleColumns } = props

  return (
    <Grid container>
      <ToggleButton
        value='show-table-columns'
        onClick={toggleColumns}
        selected={showColumns}
      >
        Columns
      </ToggleButton>
    </Grid>
  )
}

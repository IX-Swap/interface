import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import { Actions } from './Actions'
import { EditableColumns } from './EditableColumns'
import { useDSOTableColumns } from '../../hooks/useDSOTableColumns'
import { DSOTableFilters } from './DSOTableFilters'

export const DSOTable = () => {
  const { columns, selectColumn, deselectColumn } = useDSOTableColumns()
  const [showColumns, setShowColumns] = useState(false)
  const toggleColumns = () => setShowColumns(value => !value)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <DSOTableFilters
          showColumns={showColumns}
          toggleColumns={toggleColumns}
        />
      </Grid>
      {showColumns && (
        <Grid item>
          <EditableColumns
            selected={columns}
            onSelect={selectColumn}
            onDeselect={deselectColumn}
          />
        </Grid>
      )}
      <Grid item>
        <Paper variant='elevation'>
          <TableView<DigitalSecurityOffering>
            uri={`/issuance/dso/list`}
            name={dsoQueryKeys.getList}
            columns={columns}
            hasActions
            actions={Actions}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

import React from 'react'
import { Paper } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import { Actions } from './Actions'
import { EditableColumns } from './EditableColumns'
import { useDSOTableColumns } from '../../hooks/useDSOTableColumns'

export const DSOTable = () => {
  const { columns, selectColumn, deselectColumn } = useDSOTableColumns()

  return (
    <>
      <EditableColumns
        selected={columns}
        onSelect={selectColumn}
        onDeselect={deselectColumn}
      />
      <Paper variant='elevation'>
        <TableView<DigitalSecurityOffering>
          uri={`/issuance/dso/list`}
          name={dsoQueryKeys.getList}
          columns={columns}
          hasActions
          actions={Actions}
        />
      </Paper>
    </>
  )
}

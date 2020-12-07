import React from 'react'
import { Paper } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from './columns'
import { Actions } from './Actions'

export const DSOTable = () => {
  return (
    <Paper variant='elevation'>
      <TableView<DigitalSecurityOffering>
        uri={`/issuance/dso/list`}
        name={dsoQueryKeys.getList}
        columns={columns}
        hasActions
        actions={Actions}
      />
    </Paper>
  )
}

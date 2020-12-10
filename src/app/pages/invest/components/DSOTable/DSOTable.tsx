import React from 'react'
import { Grid } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { DigitalSecurityOffering } from 'types/dso'
import { dsoQueryKeys } from 'config/queryKeys'
import { Actions } from './Actions'
import { useDSOTableColumns } from '../../hooks/useDSOTableColumns'
import { DSOTableFilters } from './DSOTableFilters'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const DSOTable = () => {
  const { columns } = useDSOTableColumns()
  const { getFilterValue } = useQueryFilter()
  const search = getFilterValue('search') ?? undefined

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <DSOTableFilters />
      </Grid>
      <Grid item>
        <TableView<DigitalSecurityOffering>
          uri={`/issuance/dso/list`}
          name={dsoQueryKeys.getList}
          columns={columns}
          hasActions
          actions={Actions}
          filter={{ search }}
        />
      </Grid>
    </Grid>
  )
}

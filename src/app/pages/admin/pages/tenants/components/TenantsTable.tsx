import { columns, compactColumns } from './tenantsColumns'
import { tenantsURL } from 'config/apiURL'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const TenantsTable: React.FC = () => {
  const { isTablet } = useAppBreakpoints()

  const { getFilterValue } = useQueryFilter()
  const filter = {
    search: getFilterValue('search')
    // sortField: getFilterValue('sortBy'),
    // sortOrder: getFilterValue('orderBy') === 'ASC' ? 1 : -1
  }

  return (
    <TableView
      uri={tenantsURL.getAll}
      columns={columns}
      noHeader={isTablet}
      actionHeader={'Actions'}
      filter={
        {
          ...filter
        } as any
      }
      defaultRowsPerPage={5}
      paginationPlacement={isTablet ? 'both' : 'bottom'}
    >
      {isTablet
        ? (props: TableViewRendererProps<any>) => (
            <CompactTable
              {...props}
              columns={compactColumns}
              renderActionButton={() => null}
            />
          )
        : undefined}
    </TableView>
  )
}

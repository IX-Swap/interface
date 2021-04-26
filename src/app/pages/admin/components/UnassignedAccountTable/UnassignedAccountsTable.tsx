import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/admin/components/UnassignedAccountTable/Actions'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'
import { VirtualAccount } from 'types/virtualAccount'
import { useSelectionHelperContext } from 'components/SelectionHelper'

export const UnassignedAccountsTable: React.FC = () => {
  const selectionHelperContext = useSelectionHelperContext()

  return (
    <TableView<VirtualAccount>
      uri={`/virtual-accounts/list`}
      name={virtualAccountQueryKeys.listUnassigned}
      columns={columns}
      hasActions
      actions={Actions}
      selectionHelper={selectionHelperContext}
      filter={{ isAssigned: false }}
    />
  )
}

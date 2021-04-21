import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/admin/components/UnassignedAccountTable/Actions'
import { columns } from 'app/pages/admin/components/UnassignedAccountTable/columns'
import { VirtualAccount } from 'types/virtualAccount'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { fakeVirtualAccountsList } from '__fixtures__/unassignedVirtualAccounts'

export const UnassignedAccountsTable: React.FC = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const selectionHelperContext = useSelectionHelperContext()

  return (
    <TableView<VirtualAccount>
      // TODO Change uri and name after backend api to be ready
      uri={`/accounts/withdrawal-addresses/list/${userId}`}
      name={virtualAccountQueryKeys.listUnassigned}
      columns={columns}
      hasActions
      actions={Actions}
      selectionHelper={selectionHelperContext}
      // TODO Remove fakeItems after backend api to be ready
      fakeItems={fakeVirtualAccountsList as VirtualAccount[]}
    />
  )
}

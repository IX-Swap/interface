import React, { useState } from 'react'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { custodyAccounts } from 'config/apiURL'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { CustodyAccountsListItem } from 'types/custodyAccount'
import { Actions } from './Actions'
import { UnAssignCustodyDialog } from 'app/pages/admin/components/UnAssignCustodyDialog/UnAssignCustodyDialog'
import { ActionsProps } from 'app/pages/authorizer/components/Actions'

export const CustodyManagementTable = () => {
  const { getFilterValue } = useQueryFilter()
  const [
    isUnassignedCustodyDialogVisible,
    setIsUnassignedCustodyDialogVisible
  ] = useState<boolean>(false)
  const [
    currentCustodyAccount,
    setCurrentCustodyAccount
  ] = useState<CustodyAccountsListItem | null>(null)

  const handleLinkOffButtonClick = (item: any) => {
    setCurrentCustodyAccount(item.item)
    setIsUnassignedCustodyDialogVisible(true)
  }

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    type: getFilterValue('type')
  }

  const renderActions = (item: ActionsProps<CustodyAccountsListItem>) => {
    return (
      <Actions item={item} onLinkOffButtonClick={handleLinkOffButtonClick} />
    )
  }

  return (
    <>
      <UnAssignCustodyDialog
        custodyAccount={currentCustodyAccount}
        open={isUnassignedCustodyDialogVisible}
        onClose={() => setIsUnassignedCustodyDialogVisible(false)}
      />
      <TableView<CustodyAccountsListItem>
        uri={custodyAccounts.getList}
        name={custodyAccountsQueryKeys.getList}
        columns={columns}
        actions={renderActions}
        hasActions
        filter={filter}
        themeVariant={'primary'}
        paperProps={{ variant: 'elevation', elevation: 0 }}
      />
    </>
  )
}

import React, { useState } from 'react'
import { columns } from './columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { custodyAccounts } from 'config/apiURL'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { CustodyAccountsListItem } from 'types/custodyAccount'
import { Actions } from './Actions'
import { UnassignedCustodyDialog } from 'app/pages/admin/components/UnassignedCustodyDialog/UnassignedCustodyDialog'
import { SupportedTokensDialog } from 'app/pages/admin/components/SupportedTokensDialog/SupportedTokensDialog'

export const CustodyManagementTable = () => {
  const { getFilterValue } = useQueryFilter()
  const [
    isSupportedTokensDialogVisible,
    setIsSupportedTokensDialogVisible
  ] = useState<boolean>(false)
  const [
    isUnassignedCustodyDialogVisible,
    setIsUnassignedCustodyDialogVisible
  ] = useState<boolean>(false)
  const [
    currentCustodyAccount,
    setCurrentCustodyAccount
  ] = useState<CustodyAccountsListItem | null>(null)

  const handleLaunchButtonClick = (item: any) => {
    setCurrentCustodyAccount(item.item)
    setIsSupportedTokensDialogVisible(true)
  }

  const handleLinkOffButtonClick = (item: any) => {
    setCurrentCustodyAccount(item.item)
    setIsUnassignedCustodyDialogVisible(true)
  }

  const filter = {
    search: getFilterValue('search'),
    to: getFilterValue('toDate'),
    from: getFilterValue('fromDate'),
    // TODO Remove fake value after fix backend api
    // type: getFilterValue('type')
    type: []
  }

  const renderActions = (item: CustodyAccountsListItem) => {
    return (
      <Actions
        item={item}
        onLaunchButtonClick={handleLaunchButtonClick}
        onLinkOffButtonClick={handleLinkOffButtonClick}
      />
    )
  }

  return (
    <>
      <UnassignedCustodyDialog
        custodyAccount={currentCustodyAccount}
        open={isUnassignedCustodyDialogVisible}
        onClose={() => setIsUnassignedCustodyDialogVisible(false)}
      />
      <SupportedTokensDialog
        custodyAccount={currentCustodyAccount}
        open={isSupportedTokensDialogVisible}
        onClose={() => setIsSupportedTokensDialogVisible(false)}
      />
      <TableView<CustodyAccountsListItem>
        uri={custodyAccounts.getList}
        name={custodyAccountsQueryKeys.getList}
        columns={columns}
        actions={renderActions as any}
        hasActions
        filter={filter as any}
        themeVariant={'primary'}
        paperProps={{ variant: 'elevation', elevation: 0 }}
      />
    </>
  )
}

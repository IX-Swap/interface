import { TableView } from 'components/TableWithPagination/TableView'
import React from 'react'
import { MatchedOTCOrder } from 'types/otcOrder'
import { matchedOrders } from '__fixtures__/otcOrders'
import { columns } from './columns'

export const MatchedOrders = () => {
  //   const filter = {
  //     search: getFilterValue('search'),
  //     to: getFilterValue('toDate'),
  //     from: getFilterValue('fromDate'),
  //     type: getFilterValue('type')
  //   }

  //   const renderActions = (item: ActionsProps<CustodyAccountsListItem>) => {
  //     return (
  //       <Actions item={item} onLinkOffButtonClick={handleLinkOffButtonClick} />
  //     )
  //   }

  return (
    <>
      <TableView<MatchedOTCOrder>
        // uri={custodyAccounts.getList}
        // name={custodyAccountsQueryKeys.getList}
        columns={columns}
        // actions={renderActions}
        hasActions={false}
        // filter={filter}
        fakeItems={matchedOrders}
        themeVariant={'primary'}
        // paperProps={{ variant: 'elevation', elevation: 0 }}
      />
    </>
  )
}

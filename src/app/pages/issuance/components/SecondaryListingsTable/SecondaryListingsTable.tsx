import React from 'react'
import { Listing } from 'types/listing'
import { listings } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { listingsQueryKeys } from 'config/queryKeys'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Actions } from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions'
import {
  columns,
  compactColumns
} from 'app/pages/issuance/components/SecondaryListingsTable/columns'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { MobileActions } from 'app/pages/issuance/components/SecondaryListingsTable/MobileActions'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const SecondaryListingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const { getFilterValue } = useQueryFilter()
  const filter = {
    searchKeyword: getFilterValue('search'),
    sortField: getFilterValue('sortBy'),
    sortOrder: getFilterValue('orderBy') === 'ASC' ? 1 : -1
  }

  const { isTablet } = useAppBreakpoints()
  const titleExtractor = (item: Listing) => {
    return item.tokenSymbol
  }

  return (
    <ActiveElementContextWrapper>
      <TableView<Listing>
        name={listingsQueryKeys.getCombinedList}
        uri={listings.getCombinedList(userId)}
        columns={columns}
        actionHeader={'Actions'}
        filter={
          {
            ...filter,
            status: 'Draft,Submitted,Approved,Rejected' as any
          } as any
        }
        defaultRowsPerPage={5}
        actions={Actions}
        noHeader={isTablet}
      >
        {isTablet
          ? (props: TableViewRendererProps<any>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
                menu={
                  <MobileMenu
                    items={props.items}
                    titleExtractor={titleExtractor}
                    actions={(item: Listing) => <MobileActions item={item} />}
                  />
                }
              />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}

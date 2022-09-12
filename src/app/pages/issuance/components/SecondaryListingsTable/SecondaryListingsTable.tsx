import React from 'react'
import { Listing } from 'types/listing'
import { listings } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { listingsQueryKeys } from 'config/queryKeys'
import { useSearchFilter } from 'hooks/filters/useSearchFilter'
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

export const SecondaryListingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = useSearchFilter()
  const { isTablet } = useAppBreakpoints()
  const titleExtractor = (item: Listing) => {
    return item.tokenSymbol
  }

  // TODO Make changes for mobile and tablet version after completed design for that
  return (
    <ActiveElementContextWrapper>
      <TableView<Listing>
        name={listingsQueryKeys.getListingsList}
        uri={listings.getListByUser(userId)}
        columns={columns}
        actionHeader={'Actions'}
        // TODO Add date filter after completed backend api endpoint
        filter={{
          ...filter,
          status: 'Draft,Submitted,Approved,Rejected' as any
        }}
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

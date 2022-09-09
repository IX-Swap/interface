import React from 'react'
import { Listing } from 'types/listing'
import { listings } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { listingsQueryKeys } from 'config/queryKeys'
import { useSearchFilter } from 'hooks/filters/useSearchFilter'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Actions } from 'app/pages/issuance/components/SecondaryListingsTable/Actions'
import { columns } from 'app/pages/issuance/components/SecondaryListingsTable/columns'

export const SecondaryListingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { filter } = useSearchFilter()

  // TODO Make changes for mobile and tablet version after completed design for that
  return (
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
    />
  )
}

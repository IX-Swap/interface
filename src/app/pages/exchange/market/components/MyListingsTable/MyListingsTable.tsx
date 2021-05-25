import React from 'react'
// import { Order } from 'types/order'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { VSpacer } from 'components/VSpacer'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/exchange/market/components/MyListingsTable/columns'
import { listings } from 'config/apiURL'
import { Listing } from 'types/listing'
import { Actions } from 'app/pages/exchange/market/components/MyListingsTable/Actions'

// import { usePastOrderFilter } from 'app/pages/exchange/market/hooks/usePastOrderFilter'
// import { PastOrderFilter } from 'app/pages/exchange/market/components/PastOrderFilter/PastOrderFilter'
// import { exchangeMarketQueryKeys } from 'config/queryKeys'
// import { exchangeMarket, listings } from 'config/apiURL'

export const MyListingsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  // const { filter } = usePastOrderFilter(pairId)

  return (
    <>
      {/* <PastOrderFilter /> */}
      <VSpacer size={'small'} />
      <TableView<Listing>
        name={'test'}
        uri={listings.getByUserId(userId)}
        columns={columns}
        // filter={filter}
        defaultRowsPerPage={5}
        hasActions
        actions={Actions}
      />
    </>
  )
}

import React from 'react'

import { InvestmentList } from 'components/Launchpad/InvestmentList'
import { FilterConfig } from 'components/Launchpad/InvestmentList/Filter'

import { Pinned } from './Pinned'

import { Offer } from 'state/launchpad/types'
import { useGetOffers } from 'state/launchpad/hooks'
import Loader from 'components/Loader'


export const Offers = () => {
  const getOffers = useGetOffers()

  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [offers, setOffers] = React.useState<Offer[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [filter, setFilter] = React.useState<FilterConfig | undefined>()

  React.useEffect(() => {
    getOffers(1, filter)
      .then(page => setOffers(page.items))
      .then(() => setLoading(false))
      .then(() => setPage(2))
  }, [filter])
  
  const fetchMore = React.useCallback(async () => {
    const result = await getOffers(page, filter)

    setOffers(state => state.concat(result.items))
    setPage(state => state + 1)
    setHasMore(result.hasMore)

  }, [offers, page, filter])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Pinned />
      <InvestmentList offers={offers} onFilter={setFilter}  fetchMore={fetchMore} hasMore={hasMore}/>
    </div>
  )
}
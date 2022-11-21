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

  const isSelected = React.useCallback((offer: Offer) => {
    return !offer.isMain &&
      (!filter ||
        (filter.industry.length === 0 || filter.industry.find(x => x.value === offer.industry)) &&
        // (filter.stage.length === 0 || filter.stage.find(x => x.value === offer.stage)) &&
        (filter.type.length === 0 || filter.stage.find(x => x.value === offer.type))
      )
  }, [filter])

  const mainOfferList = React.useMemo(() => offers.filter(offer => !offer.isMain && isSelected(offer)), [offers, isSelected])
  const pinnedOffer = React.useMemo(() => offers.find(offer => offer.isMain), [offers])
  
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
      {pinnedOffer && <Pinned offer={pinnedOffer} />}
      <InvestmentList offers={mainOfferList} onFilter={setFilter}  fetchMore={fetchMore} hasMore={hasMore}/>
    </div>
  )
}
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InvestmentList } from 'components/Launchpad/InvestmentList'
import { FilterConfig } from 'components/Launchpad/InvestmentList/Filter'
import { Pinned } from './Pinned'
import { Offer } from 'state/launchpad/types'
import { useGetOffers } from 'state/launchpad/hooks'
import { MEDIA_WIDTHS } from 'theme'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { isLineLiff } from 'utils'

const InvestmentListWrapper = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  padding-top: 80px;
  padding-bottom: 50px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0rem;
  }
`

export const Offers = () => {
  const getOffers = useGetOffers()
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [offers, setOffers] = React.useState<Offer[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const { config } = useWhitelabelState()
  const [filter, setFilter] = React.useState<FilterConfig>(() => {
    const newFilter = localStorage.getItem('offersFilter')
    const initFilter = newFilter
      ? (JSON.parse(newFilter) as FilterConfig)
      : { search: '', industry: [], stage: [], type: [], network: [] }
    if (isLineLiff) {
      initFilter.network = [{ label: 'Kaia', value: 'kaia' }]
    }

    return initFilter
  })
  const isIxSwap = config?.isIxSwap ?? false

  useEffect(() => {
    localStorage.setItem('offersFilter', JSON.stringify(filter))
  }, [filter])

  React.useEffect(() => {
    getOffers(1, filter)
      .then((page) => {
        setOffers(page.items)
        setHasMore(page.hasMore)
      })
      .then(() => setLoading(false))
      .then(() => setPage(2))
  }, [filter])

  const fetchMore = React.useCallback(async () => {
    setLoading(true)

    const result = await getOffers(page, filter)

    setOffers((state) => state.concat(result.items))
    setPage((state) => state + 1)
    setHasMore(result.hasMore)

    setLoading(false)
  }, [offers, page, filter])

  return (
    <div style={{ width: '100%' }}>
      {isIxSwap && !isLineLiff ? <Pinned /> : null}
      <InvestmentListWrapper>
        <InvestmentList
          offers={offers}
          filter={filter}
          onFilter={setFilter}
          fetchMore={fetchMore}
          isLoading={loading}
          hasMore={hasMore}
        />
      </InvestmentListWrapper>
    </div>
  )
}

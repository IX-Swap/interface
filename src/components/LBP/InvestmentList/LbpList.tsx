import React, { useEffect } from 'react'
import LbpListFilter, { FilterConfig } from './Filter'
import { LbpCard } from './LbpCard'
import styled from 'styled-components'
import { useGetLbpsFull } from 'state/lbp/hooks'
import { Lbp } from 'state/lbp/types'
import { PaginationTrigger } from 'components/Launchpad/InvestmentList/PaginationTrigger'

export const LbpList = () => {
  const getLbps = useGetLbpsFull()

  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [lbps, setLbps] = React.useState<Lbp[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [filter, setFilter] = React.useState<FilterConfig>(() => {
    const newFilter = localStorage.getItem('lbpsFilter')
    return newFilter ? (JSON.parse(newFilter) as FilterConfig) : { search: '', stage: [] }
  })

  useEffect(() => {
    localStorage.setItem('lbpsFilter', JSON.stringify(filter))
  }, [filter])

  React.useEffect(() => {
    getLbps(1, filter, undefined, 10, true)
      .then((page) => {
        setLbps(page.items)
        setHasMore(page.hasMore)
      })
      .then(() => setLoading(false))
      .then(() => setPage(2))
  }, [filter])

  const fetchMore = React.useCallback(async () => {
    setLoading(true)

    const result = await getLbps(page, filter)

    setLbps((state) => state.concat(result.items))
    setPage((state) => state + 1)
    setHasMore(result.hasMore)

    setLoading(false)
  }, [lbps, page, filter])

  return (
    <div>
      <LbpListFilter filter={filter} onFilter={setFilter} />
      <InvestmentListGrid>
        {lbps.map((lbp) => (
          <LbpCard key={lbp.id} lbp={lbp} />
        ))}
      </InvestmentListGrid>
      {hasMore && <PaginationTrigger isLoading={loading} onTriggered={fetchMore} />}
    </div>
  )
}

const InvestmentListGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  place-content: start;
`

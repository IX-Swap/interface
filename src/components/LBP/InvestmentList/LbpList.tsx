import React, { useEffect } from 'react'
import LbpListFilter, { FilterConfig } from './Filter'
import { LbpCard } from './LbpCard'
import styled from 'styled-components'
import { useGetLbpsFull } from 'state/lbp/hooks'
import { Lbp } from 'state/lbp/types'
import { PaginationTrigger } from 'components/Launchpad/InvestmentList/PaginationTrigger'
import { ReactComponent as NoItemImage } from '../../../assets/images/noitem.svg'
import { ReactComponent as EmptyListImage } from '../../../assets/images/emptylist.svg'

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
      {lbps && lbps.length > 0 ? (
        <InvestmentListGrid>
          {lbps.map((lbp) => (
            <LbpCard key={lbp.id} lbp={lbp} />
          ))}
        </InvestmentListGrid>
      ) : filter && (filter.search !== '' || (filter.stage && filter.stage.length > 0)) ? (
        <EmptyListContainer>
          <NoItemImage />
          <EmptyBox>
            <EmptyListTitle>No items found</EmptyListTitle>
            <EmptyListMessage>No items found matching your search criteria.</EmptyListMessage>
          </EmptyBox>
        </EmptyListContainer>
      ) : (
        <EmptyListContainer>
          <EmptyListImage />
          <EmptyBox>
            <EmptyListTitle>Empty List</EmptyListTitle>
            <EmptyListMessage>There are no LBP at the moment</EmptyListMessage>
          </EmptyBox>
        </EmptyListContainer>
      )}
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

const EmptyListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 59px 64px;
`

const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-top: 20px;
`

const EmptyListTitle = styled.p`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  color: rgba(85, 85, 102, 1);
  margin-bottom: 10px;
`

const EmptyListMessage = styled.p`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 400;
  color: rgba(143, 143, 178, 1);
  margin: 0;
`

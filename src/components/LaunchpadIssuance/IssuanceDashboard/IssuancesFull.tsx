import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { Eye } from 'react-feather'

import { Issuance } from 'state/launchpad/types'
import { IssuanceFilter, IssuanceStatus } from '../types'
import { IssuanceStatusBadge } from './IssuanceStatusBadge'
import { SearchFilter, SearchConfig } from './SearchFilter'

import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableTitle, TableHeader, IssuanceRow } from 'components/LaunchpadMisc/tables'
import { PaginationTrigger } from 'components/Launchpad/InvestmentList/PaginationTrigger'

import { useGetIssuances } from 'state/launchpad/hooks'


export const IssuancesFull = () => {
  const theme = useTheme()
  const getIssuances = useGetIssuances()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [issuances, setIssuances] = React.useState<Issuance[]>([])
  
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [filter, setFilter] = React.useState<SearchConfig | undefined>()

  React.useEffect(() => {
    getIssuances(1, filter)
      .then(page => {
        setIssuances(page.items)
        setHasMore(page.hasMore)
      })
      .then(() => setLoading(false))
      .then(() => setPage(2))
  }, [filter])

  const fetchMore = React.useCallback(async () => {
    setLoading(true)

    const result = await getIssuances(page)

    setIssuances(state => state.concat(result.items))
    setPage(state => state + 1)
    setHasMore(result.hasMore)
    
    setLoading(false)
  }, [issuances, page])

  const status = React.useCallback((issuance: Issuance) => {
    return issuance.vetting && issuance.vetting?.offer
      ? issuance.vetting?.offer.status
      : (issuance.vetting && issuance.vetting?.status !== IssuanceStatus.draft)
        ? issuance.vetting.status
        : IssuanceStatus.inProgress
  }, [])
  
  return (
    <Container>
      <TableTitle>Issuances</TableTitle>
      <SearchFilter onFilter={setFilter}/>

      <IssuanceTable>
        <TableHeader tab={IssuanceFilter.pending}>
          <div>Issuances</div>
          <div>Start Date</div>
          <div>Status</div>
          <div>Action</div>
        </TableHeader>

        {issuances.map((issuance, idx) => (
          <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
            <div>{issuance.name}</div>

            <div>
              {(issuance?.vetting?.offer && issuance?.vetting?.offer?.startDate)
                ? moment(issuance?.vetting?.offer?.startDate).format('DD/MM/YYYY')
                : ''}
            </div>

            <IssuanceStatusBadge status={status(issuance)} />

            <OutlineButton color={theme.launchpad.colors.primary + '80'} height="34px">
              View Application <Eye size="15" color={theme.launchpad.colors.primary} />
            </OutlineButton>
          </IssuanceRow>
        ))}
        {hasMore && <PaginationTrigger isLoading={loading} onTriggered={fetchMore} />}
      </IssuanceTable>

    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
`


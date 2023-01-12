import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { Eye } from 'react-feather'

import { ReactComponent as VectorIcon } from 'assets/launchpad/svg/vectors.svg'

import { Issuance } from 'state/launchpad/types'
import { IssuanceFilter, IssuanceStatus } from '../types'

import { IssuanceStatusBadge } from './IssuanceStatusBadge'
import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { PaginationTrigger } from './PaginationTrigger'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableTitle, TableHeader, IssuanceRow } from 'components/LaunchpadMisc/tables'

import { useGetIssuances } from 'state/launchpad/hooks'


export const IssuancesFull = () => {
  const theme = useTheme()
  const getIssuances = useGetIssuances()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [issuances, setIssuances] = React.useState<Issuance[]>([])
  
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(false)
  const [filter, setFilter] = React.useState<SearchConfig | undefined>()
  const [order, setOrder] = React.useState<OrderConfig>({ name: 'ASC' })
  
  const [isNameAsc, setNameAsc] = React.useState<boolean>(true)
  const [isStartDateAsc, setStartDateAsc] = React.useState<boolean>(true)
  const [isStatusAsc, setStatusAsc] = React.useState<boolean>(true)

  React.useEffect(() => {
    setLoading(true)

    getIssuances(1, filter, order)
      .then(page => {
        setIssuances(page.items)
        setHasMore(page.hasMore)
      })      
      .then(() => setPage(2))
      .finally(() => setLoading(false))
  }, [filter, order])

  const fetchMore = React.useCallback(async () => {
    setLoading(true)

    const result = await getIssuances(page, filter, order)

    setIssuances(state => state.concat(result.items))
    setPage(state => state + 1)
    setHasMore(result.hasMore)
    
    setLoading(false)
  }, [issuances, page, filter, order])

  const status = React.useCallback((issuance: Issuance) => {
    return issuance.vetting && issuance.vetting?.offer
      ? issuance.vetting?.offer.status
      : (issuance.vetting && issuance.vetting?.status !== IssuanceStatus.draft)
        ? issuance.vetting.status
        : IssuanceStatus.inProgress
  }, [])

  const onChaneNameOrder = React.useCallback(() => {
    const manner = isNameAsc ? 'ASC' : 'DESC'
    
    setOrder(state => ({ ...state, name: manner }))
    setNameAsc(state => !state)
  }, [isNameAsc])

  const onChangeStartDateOrder = React.useCallback(() => {
    const manner = isStartDateAsc ? 'ASC' : 'DESC'
    
    setOrder(state => ({ ...state, startDate: manner }))
    setStartDateAsc(state => !state)
  }, [isStartDateAsc])

  const onChangeStatusOrder = React.useCallback(() => {
    const manner = isStatusAsc ? 'ASC' : 'DESC'
    
    setOrder(state => ({ ...state, status: manner }))
    setStatusAsc(state => !state)
  }, [isStatusAsc])

  return (
    <Container>
      <TableTitle>Issuances</TableTitle>
      <SearchFilter onFilter={setFilter}/>

      <IssuanceTable>
        <TableHeader tab={IssuanceFilter.pending}>
          <Title onClick={onChaneNameOrder}> <VectorIcon /> Issuances</Title>
          <Title onClick={onChangeStartDateOrder}> <VectorIcon /> Start Date</Title>
          <Title onClick={onChangeStatusOrder}> <VectorIcon /> Status</Title>
          <div>  Action</div>
        </TableHeader>

        {loading && (
          <Centered>
            <Loader />
          </Centered>
        )}

        {!loading && issuances.map((issuance, idx) => (
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
          
        {hasMore && !loading && <PaginationTrigger isLoading={loading} onTriggered={fetchMore} />}
      </IssuanceTable>
    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
`

const Title = styled.div`
  cursor: pointer;
`


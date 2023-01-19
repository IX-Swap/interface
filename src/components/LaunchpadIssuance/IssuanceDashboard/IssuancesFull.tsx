import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { Eye } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'

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
  const history = useHistory()
  const getIssuances = useGetIssuances()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [issuances, setIssuances] = React.useState<Issuance[]>([])
  
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(false)
  const [filter, setFilter] = React.useState<SearchConfig | undefined>()
  const [order, setOrder] = React.useState<OrderConfig>({})
  
  const [isNameAsc, setNameAsc] = React.useState<string | null>('ASC')
  const [isStartDateAsc, setStartDateAsc] = React.useState<string | null>('ASC')
  const [isStatusAsc, setStatusAsc] = React.useState<string | null>('ASC')

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

  const orderType = React.useCallback((state: string | null) => !state ? 'ASC' : state === 'ASC' ? 'DESC' : null, [])

  const veiwItem = React.useCallback((id: number) => history.push(`/issuance/create?id=${id}`), [history])

  const onChaneNameOrder = React.useCallback(() => {
    const manner = isNameAsc ? isNameAsc : null
    
    setOrder({ name: manner })
    setNameAsc(orderType)
  }, [isNameAsc])

  const onChangeStartDateOrder = React.useCallback(() => {
    const manner = isStartDateAsc ? isStartDateAsc : null
    
    setOrder({ startDate: manner })
    setStartDateAsc(orderType)
  }, [isStartDateAsc])

  const onChangeStatusOrder = React.useCallback(() => {
    const manner = isStatusAsc ? isStatusAsc : null
    
    setOrder({ status: manner })
    setStatusAsc(orderType)
  }, [isStatusAsc])

  return (
    <Container>
      <TableTitle>Issuances</TableTitle>
      <SearchFilter onFilter={setFilter}/>

      <IssuanceTable>
        <TableHeader tab={IssuanceFilter.pending}>
          <Title onClick={onChaneNameOrder}> <SortIcon type={order.name}/> Issuances</Title>
          <Title onClick={onChangeStartDateOrder}> <SortIcon type={order.startDate}/> Start Date</Title>
          <Title onClick={onChangeStatusOrder}> <SortIcon type={order.status}/> Status</Title>
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

            <OutlineButton
              color={theme.launchpad.colors.primary + '80'}
              height="34px"
              onClick={() => veiwItem(issuance.id)}>
              View Application <Eye size="15" color={theme.launchpad.colors.primary} />
            </OutlineButton>
          </IssuanceRow>
        ))}
          
      </IssuanceTable>
      {hasMore && !loading && <PaginationTrigger isLoading={loading} onTriggered={fetchMore} />}
    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
`

const Title = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
`

import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { Eye } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'

import { AbstractOrder, Issuance } from 'state/launchpad/types'
import { IssuanceFilter, IssuanceStatus } from '../types'

import { IssuanceStatusBadge } from './IssuanceStatusBadge'
import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableTitle, TableHeader, IssuanceRow, Raw, Title } from 'components/LaunchpadMisc/tables'

import { useGetIssuances, useOnChangeOrder } from 'state/launchpad/hooks'
import { IssuancePagination } from './IssuancePagination'
import { DiscreteInternalLink } from 'theme'

export const IssuancesFull = () => {
  const theme = useTheme()
  const getIssuances = useGetIssuances()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [issuances, setIssuances] = React.useState<Issuance[]>([])

  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [filter, setFilter] = React.useState<SearchConfig | undefined>()
  const [order, setOrder] = React.useState<OrderConfig>({})

  const status = React.useCallback((issuance: Issuance) => {
    if (!issuance.vetting) {
      return IssuanceStatus.inProgress
    }

    if (
      issuance.vetting &&
      issuance.vetting.status === IssuanceStatus.approved &&
      issuance.vetting.offer?.status !== IssuanceStatus.approved
    ) {
      return IssuanceStatus.inProgress
    }

    return issuance.vetting && issuance.vetting?.offer
      ? issuance.vetting?.offer.status
      : issuance.vetting && issuance.vetting?.status !== IssuanceStatus.draft
      ? issuance.vetting.status
      : IssuanceStatus.inProgress
  }, [])

  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)

  const scrollToTop = React.useCallback(() => {
    //window.scrollTo({ top: 0, behavior: 'smooth' })
    const yOffset = document.documentElement.scrollTop || document.body.scrollTop
    if (yOffset > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, yOffset - yOffset / 1.75)
    }
  }, [])

  const onChangePageSize = React.useCallback((size: number) => {
    setPageSize(size)
    setPage(1)
    scrollToTop()
  }, [])

  const onChangePage = React.useCallback((pageNumber: number) => {
    scrollToTop()
    setPage(pageNumber)
  }, [])

  React.useEffect(() => {
    setLoading(true)

    getIssuances(page, filter, order, pageSize)
      .then((page) => {
        setIssuances(page.items)
        setTotalItems(page.totalItems)
        setTotalPages(page.totalPages)
      })
      .finally(() => setLoading(false))
  }, [filter, order, page, pageSize])

  return (
    <Container>
      <TableTitle>Issuances</TableTitle>
      <SearchFilter onFilter={setFilter} />

      {!loading && issuances?.length === 0 && <EmptyTable />}

      {issuances?.length > 0 && (
        <IssuanceTable>
          <TableHeader tab={IssuanceFilter.pending}>
            <Title onClick={() => onChangeOrder('name')}>
              {' '}
              <SortIcon type={order.name} /> Issuances
            </Title>
            <Title onClick={() => onChangeOrder('startDate')}>
              {' '}
              <SortIcon type={order.startDate} /> Start Date
            </Title>
            <Title onClick={() => onChangeOrder('status')}>
              {' '}
              <SortIcon type={order.status} /> Status
            </Title>
            <div> Action</div>
          </TableHeader>

          {loading && (
            <Centered>
              <Loader />
            </Centered>
          )}

          {!loading &&
            issuances.map((issuance, idx) => (
              <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
                <Raw>{issuance.name}</Raw>

                <Raw>
                  {issuance?.vetting?.offer && issuance?.vetting?.offer?.startDate
                    ? moment(issuance?.vetting?.offer?.startDate).format('DD/MM/YYYY')
                    : ''}
                </Raw>

                <IssuanceStatusBadge status={status(issuance)} />

                <OutlineButton
                  color={theme.launchpad.colors.primary + '80'}
                  height="34px"
                  as={DiscreteInternalLink}
                  target="_blank"
                  to={`/issuance/create?id=${issuance.id}`}
                >
                  View Application <Eye size="15" color={theme.launchpad.colors.primary} />
                </OutlineButton>
              </IssuanceRow>
            ))}
        </IssuanceTable>
      )}

      <IssuancePagination
        currentPage={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
      />
    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
`

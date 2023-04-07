import React, { useCallback } from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { Eye } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'

import { AbstractOrder, Issuance, OfferStatus } from 'state/launchpad/types'
import { IssuanceFilter, IssuanceStatus } from '../types'

import { IssuanceStatusBadge } from './IssuanceStatusBadge'
import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableHeader, IssuanceRow, Raw, Title } from 'components/LaunchpadMisc/tables'

import { useGetIssuances, useOnChangeOrder } from 'state/launchpad/hooks'
import { IssuancePagination } from './IssuancePagination'
import { ReactComponent as GearIcon } from 'assets/launchpad/svg/gear-icon.svg'
import { DiscreteInternalLink } from 'theme'
import { useRole } from 'state/user/hooks'
import { TitleBox } from './TitleBox'
import { routes } from 'utils/routes'
import { IssuanceApplicationPopup } from './IssuanceInformationPopup'
import { useHistory } from 'react-router-dom'

const getIssuanceManageUrl = ({ id, isMine, vetting }: Issuance) => {
  if (!isMine) return ''
  const query = `?id=${id}`
  if (!vetting || vetting.status !== IssuanceStatus.approved) {
    return `${routes.createVetting}${query}`
  }
  if (!vetting.offer || vetting.offer.status !== OfferStatus.pendingApproval) {
    return `${routes.createOffer}${query}`
  }
  return `${routes.editOffer}${query}`
}

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
  const [issuance, setIssuance] = React.useState<Issuance | null>(null)
  const [popUpOpen, setPopUpOpen] = React.useState(false)
  const { isAdmin, isOfferManager } = useRole()
  const history = useHistory()

  const status = React.useCallback((issuance: Issuance) => {
    if (!issuance.vetting) {
      return IssuanceStatus.inProgress
    }
    if (issuance.vetting.status === IssuanceStatus.approved && !issuance.vetting.offer) {
      return IssuanceStatus.inProgress
    }
    return issuance.vetting?.offer?.status || issuance.vetting?.status || IssuanceStatus.inProgress
  }, [])

  const selectIssuance = useCallback(
    (issuance: Issuance) => {
      if (isAdmin) {
        setIssuance(issuance)
        setPopUpOpen(true)
      } else if (isOfferManager) {
        history.push(`/issuance/create?id=${issuance.id}`)
      }
    },
    [isAdmin, isOfferManager]
  )
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)

  const scrollToTop = React.useCallback(() => {
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

  const getManageUrl = useCallback(
    (issuance: Issuance) => {
      if (!isAdmin) return ''
      return getIssuanceManageUrl(issuance)
    },
    [isAdmin]
  )

  const onSearch = useCallback(
    (search: string) => {
      setFilter((state: SearchConfig | undefined) => ({
        ...(state || {}),
        search,
      }))
      if (page !== 1) {
        setPage(1)
      }
    },
    [setFilter, page, setPage]
  )

  return (
    <Container>
      {popUpOpen && <IssuanceApplicationPopup issuance={issuance} isOpen={popUpOpen} setOpen={setPopUpOpen} />}
      <TitleBox title="Issuances" setFilter={setFilter} />

      <SearchFilter onFilter={onSearch} />

      {!loading && issuances?.length === 0 && <EmptyTable isSearch={Boolean(filter?.search)} />}

      {issuances?.length > 0 && (
        <IssuanceTable>
          <TableHeader tab={IssuanceFilter.pending}>
            <Title onClick={() => onChangeOrder('name')}>
              <SortIcon type={order.name} /> Issuances
            </Title>
            <Title onClick={() => onChangeOrder('startDate')}>
              <SortIcon type={order.startDate} /> Start Date
            </Title>
            <Title onClick={() => onChangeOrder('status')}>
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

                <IssuanceStatusBadge
                  status={status(issuance) as any}
                  isDeployed={Boolean(issuance?.vetting?.offer?.contractSaleId)}
                />

                <ActionButtons>
                  <OutlineButton
                    color={theme.launchpad.colors.primary + '80'}
                    height="34px"
                    onClick={() => selectIssuance(issuance)}
                  >
                    View Application <Eye size="15" color={theme.launchpad.colors.primary} />
                  </OutlineButton>

                  {isAdmin && !!issuance.isMine && (
                    <OutlineButton
                      color={theme.launchpad.colors.primary + '80'}
                      borderType="tiny"
                      height="34px"
                      as={DiscreteInternalLink}
                      to={getManageUrl(issuance)}
                    >
                      <GearIcon />
                    </OutlineButton>
                  )}
                </ActionButtons>
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
const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

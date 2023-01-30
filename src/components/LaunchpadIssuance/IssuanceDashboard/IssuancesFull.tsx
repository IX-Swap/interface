import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Eye } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'

import { Issuance } from 'state/launchpad/types'
import { IssuanceFilter, IssuanceStatus } from '../types'

import { IssuanceStatusBadge } from './IssuanceStatusBadge'
import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableTitle, TableHeader, IssuanceRow, Raw, Title } from 'components/LaunchpadMisc/tables'

import { useGetIssuances } from 'state/launchpad/hooks'

import { ITEM_ROWS } from '../utils/constants'


export const IssuancesFull = () => {
  const theme = useTheme()
  const history = useHistory()
  const getIssuances = useGetIssuances()

  const container = React.useRef<HTMLDivElement>(null)

  const [showDropdown, setShowDropdown] = React.useState(false)

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
      : (issuance.vetting && issuance.vetting?.status !== IssuanceStatus.draft)
        ? issuance.vetting.status
        : IssuanceStatus.inProgress
  }, [])

  const veiwItem = React.useCallback((id: number) => history.push(`/issuance/create?id=${id}`), [history])

  const onChangeOrder = React.useCallback((key: string) => {
    const current = Object.keys(order)[0]
    if (!current || current !== key) {
      setOrder({ [key]: 'ASC' })
    }

    if (current === key) {
      const value = Object.values(order)[0]
      const manner = !value ? 'ASC' : value === 'ASC' ? 'DESC' : null

      setOrder({ [current]: manner })
    }

    setPage(1)
  }, [order])

  const scrollToTop = React.useCallback(() => {
    //window.scrollTo({ top: 0, behavior: 'smooth' })
    const yOffset = document.documentElement.scrollTop || document.body.scrollTop;
    if (yOffset > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, yOffset - yOffset / 1.75);
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

  const paginationSizes = React.useMemo(() => ITEM_ROWS, [])

  React.useEffect(() => {
    setLoading(true)

    getIssuances(page, filter, order, pageSize)
      .then(page => {
        setIssuances(page.items)
        setTotalItems(page.totalItems)
        setTotalPages(page.totalPages)
      })      
      .finally(() => setLoading(false))
  }, [filter, order, page, pageSize])

  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showDropdown, container])

  return (

    <Container>
      <TableTitle>Issuances</TableTitle>
      <SearchFilter onFilter={setFilter}/>

      {!loading && issuances?.length === 0 && (<EmptyTable />)}

      {issuances?.length > 0 && (
        <IssuanceTable>
          <TableHeader tab={IssuanceFilter.pending}>
            <Title onClick={() => onChangeOrder('name')}> <SortIcon type={order.name}/> Issuances</Title>
            <Title onClick={() => onChangeOrder('startDate')}> <SortIcon type={order.startDate}/> Start Date</Title>
            <Title onClick={() => onChangeOrder('status')}> <SortIcon type={order.status}/> Status</Title>
            <div>  Action</div>
          </TableHeader>

          {loading && (
            <Centered>
              <Loader />
            </Centered>
          )}
          

          {!loading && issuances.map((issuance, idx) => (
            <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
              <Raw>{issuance.name}</Raw>

              <Raw>
                {(issuance?.vetting?.offer && issuance?.vetting?.offer?.startDate)
                  ? moment(issuance?.vetting?.offer?.startDate).format('DD/MM/YYYY')
                  : ''}
              </Raw>

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
      )}

      <PaginationRow>
        <PageSizeDropdown ref={container} onClick={() => setShowDropdown(state => !state)}>
          <PageSizeLabel>{pageSize}</PageSizeLabel>
          
          <PageSizeIcon isOpen={showDropdown}>
            <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
          </PageSizeIcon>
          
          {showDropdown && (
            <PageSizeOptions>
              {paginationSizes.map((option, idx) => (
                <PageSizeOption key={idx} onClick={() => onChangePageSize(option.value)}>{option.label}</PageSizeOption>
              ))}
            </PageSizeOptions>
          )}
        </PageSizeDropdown>

        <PageCount>
          {((page - 1) * pageSize) + 1} - {page * pageSize < totalItems ? page * pageSize : totalItems} of {totalItems}
        </PageCount>

        <PageButton onClick={() => onChangePage(page - 1)} disabled={page <= 1}>
          <ChevronLeft />
        </PageButton>
        
        <PageButton onClick={() => onChangePage(page + 1)} disabled={page >= totalPages}>
          <ChevronRight />
        </PageButton>
      </PaginationRow>
    </Container>
  )
}

const Container = styled.article`
  min-height: 100vh;
`

const PaginationRow = styled.div`
  display: flex;

  flex-flow: row nowrap;

  justify-content: flex-end;
  align-items: center;

  gap: 0.5rem;

  height: 40px;
  max-width: 1180px;

  margin: 1rem auto;
`

const PageCount = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 48px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const PageButton = styled.button`
  display: grid;

  place-content: center;

  width: 30px;
  height: 30px;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 27px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  ${props => props.disabled && `
    background: ${props.theme.launchpad.colors.disabled};
  `}

  ${props => !props.disabled && `
    cursor: pointer;

    transition: all 0.3s;

    :hover {
      background: ${props.theme.launchpad.colors.foreground};
      transform: scale(1.1);
    }
  `}
`

const PageSizeDropdown = styled.div`
  position: relative;

  display: flex;

  flex-flow: row nowrap;

  gap: 0.25rem;
  padding: 0.5rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const PageSizeIcon = styled.div<{ isOpen: boolean }>`
  grid-area: icon;

  display: grid;
  place-content: center;

  > svg {
    transition: transofrm 0.4s;
    ${props => props.isOpen && 'transform: rotate(180deg);' };
  }
`

const PageSizeOptions = styled.div`
  position: absolute;

  bottom: -0.5rem;
  left: 0;
  right: 0;

  transform: translate(0, 100%);

  z-index: 30;

  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  max-height: 300px;
  overflow-y: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeOption = styled.div`
  padding: 0.5rem 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  cursor: pointer;

  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`

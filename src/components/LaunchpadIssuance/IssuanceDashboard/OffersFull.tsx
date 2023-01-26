import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Eye } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'
import { ReactComponent as ListingIcon } from 'assets/launchpad/svg/listing-icon.svg'
import { ReactComponent as GearIcon } from 'assets/launchpad/svg/gear-icon.svg'

import { DashboardOffer } from 'state/launchpad/types'
import { IssuanceFilter } from '../types'

import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceTable, TableTitle, TableHeader, IssuanceRow } from 'components/LaunchpadMisc/tables'

import { useGetOffersFull, useFormatOfferValue } from 'state/launchpad/hooks'

import { ITEM_ROWS, OFFER_STATUSES } from '../utils/constants'


interface Props {
  type: string
}

export const OffersFull: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const formatedValue = useFormatOfferValue()
  const getOffers = useGetOffersFull()

  const container = React.useRef<HTMLDivElement>(null)

  const [showDropdown, setShowDropdown] = React.useState(false)

  const [loading, setLoading] = React.useState<boolean>(true)
  const [offers, setOffers] = React.useState<DashboardOffer[]>([])
  
  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [filter, setFilter] = React.useState<SearchConfig | undefined>()
  const [order, setOrder] = React.useState<OrderConfig>({})


  const veiwItem = React.useCallback((id: number) => history.push(`/offers/${id}`), [history])

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

  const onChangePageSize = React.useCallback((size: number) => {
    setPageSize(size)
    setPage(1)
  }, [])

  const onChangePage = React.useCallback((pageNumber: number) => {
    scrollToTop()
    setPage(pageNumber)
  }, [])

  const paginationSizes = React.useMemo(() => ITEM_ROWS, [])

  const scrollToTop = React.useCallback(() => {
    //window.scrollTo({ top: 0, behavior: 'smooth' })
    const yOffset = document.documentElement.scrollTop || document.body.scrollTop;
    if (yOffset > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, yOffset - yOffset / 1.75);
    }
  }, [])

  React.useEffect(() => {
    setLoading(true)

    getOffers(page, filter, order, props.type, pageSize)
      .then(page => {
        setOffers(page.items)
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
      <TableTitle>{props.type}</TableTitle>
      <SearchFilter onFilter={setFilter}/>

      {!loading && offers?.length === 0 && (<EmptyTable />)}

      {offers?.length > 0 && (
        <IssuanceTable>
          <TableHeader tab={IssuanceFilter.live}>
            <Title onClick={() => onChangeOrder('issuanceName')}> <SortIcon type={order.issuanceName}/> Issuances</Title>
            <Title onClick={() => onChangeOrder('countInvestors')}> <SortIcon type={order.countInvestors}/> Investors</Title>
            <Title onClick={() => onChangeOrder('commitment')}> <SortIcon type={order.commitment}/> Commitment</Title>
            <Title onClick={() => onChangeOrder('progress')}> <SortIcon type={order.progress}/> Progress</Title>
            <Title onClick={() => onChangeOrder('softCapReached')}> <SortIcon type={order.softCapReached}/> Total Funding</Title>
            <Title onClick={() => onChangeOrder('closeDate')}> <SortIcon type={order.closeDate}/> Close Date</Title>
            <Title onClick={() => onChangeOrder('status')}> <SortIcon type={order.status}/> Stage</Title>
            <div>  Action</div>
          </TableHeader>

          {loading && (
            <Centered>
              <Loader />
            </Centered>
          )}

          {!loading && offers.map((offer, idx) => (
            <IssuanceRow key={idx} tab={IssuanceFilter.live}>
              <div>{offer.issuanceName}</div>
              <div>{offer.countInvestors}</div>
              <div>{formatedValue(`${offer.commitment}`)}</div>
              <CountRow>{offer.progressPercent}% - {formatedValue(`${offer.progress}`)}</CountRow>
              <div>{formatedValue(`${offer.softCapReached}`) || '0.00'} {offer.investingTokenSymbol}</div>

              <CountRow>
                {(offer?.closeDate)
                  ? moment(offer?.closeDate).format('DD/MM/YYYY')
                  : ''}
              </CountRow>

              <DefaultRaw>{OFFER_STATUSES[offer.status]}</DefaultRaw>

              <ActionButtons>
              <OutlineButton
                color={theme.launchpad.colors.primary + '80'}
                borderType="tiny"
                height="34px"
                onClick={() => veiwItem(offer.id)}>
                Listing <ListingIcon />
              </OutlineButton>

              <OutlineButton
                color={theme.launchpad.colors.primary + '80'}
                borderType="tiny"
                height="34px">
                <GearIcon />
              </OutlineButton>
              </ActionButtons>
              
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

const Title = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
`

const DefaultRaw = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  letter-spacing: -0.01em;

  opacity: 0.8;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt}
`

const CountRow = styled.div`
  opacity: 0.8;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt}
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
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

import React, { useCallback } from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'

import { SortIcon } from '../utils/SortIcon'
import { ReactComponent as ListingIcon } from 'assets/launchpad/svg/listing-icon.svg'
import { ReactComponent as GearIcon } from 'assets/launchpad/svg/gear-icon.svg'

import { AbstractOrder, DashboardOffer } from 'state/launchpad/types'
import { IssuanceFilter } from '../types'

import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import {
  IssuanceTable,
  TableHeader,
  IssuanceRow,
  Raw,
  DefaultRaw,
  CountRow,
  Title,
} from 'components/LaunchpadMisc/tables'

import { useGetOffersFull, useFormatOfferValue, useOnChangeOrder } from 'state/launchpad/hooks'

import { ITEM_ROWS, OFFER_STATUSES } from '../utils/constants'
import { DiscreteInternalLink } from 'theme'
import { text17, text18, text19, text30 } from 'components/LaunchpadMisc/typography'
import { TitleBox } from './TitleBox'

interface Props {
  type: string
}

const HEADERS = [
  { key: 'issuanceName', label: 'Issuances' },
  { key: 'countInvestors', label: 'Investors' },
  { key: 'commitment', label: 'Commitment' },
  { key: 'progress', label: 'Progress' },
  { key: 'softCapReached', label: 'Total Funding' },
  { key: 'closeDate', label: 'Close Date' },
  { key: 'status', label: 'Stage' },
]

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

  const viewItem = React.useCallback((id: number) => history.push(`/offers/${id}`), [history])

  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)

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
    const yOffset = document.documentElement.scrollTop || document.body.scrollTop
    if (yOffset > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, yOffset - yOffset / 1.75)
    }
  }, [])

  React.useEffect(() => {
    setLoading(true)

    getOffers(page, filter, order, props.type, pageSize)
      .then((page) => {
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
      <TitleBox title={props.type} setFilter={setFilter} />
      <SearchFilter onFilter={onSearch} />

      {!loading && offers?.length === 0 && <EmptyTable isSearch={Boolean(filter?.search)} />}

      {offers?.length > 0 && (
        <IssuanceTable>
          <TableHeader tab={IssuanceFilter.live}>
            <>
              {HEADERS.map((header) => (
                <Title key={header.key} onClick={() => onChangeOrder(header.key)}>
                  {' '}
                  <SortIcon type={order[header.key as keyof OrderConfig]} /> {header.label}
                </Title>
              ))}
            </>
            <div> Action</div>
          </TableHeader>

          {loading && (
            <Centered>
              <Loader />
            </Centered>
          )}

          {!loading &&
            offers.map((offer, idx) => (
              <IssuanceRow key={idx} tab={IssuanceFilter.live}>
                <Raw>{offer.issuanceName}</Raw>
                <Raw>{offer.countInvestors}</Raw>
                <Raw>
                  {formatedValue(offer.commitment.toString())} {offer.investingTokenSymbol}
                </Raw>
                <CountRow>
                  {offer.progressPercent}% - {formatedValue(offer.progress.toString())} {offer.investingTokenSymbol}
                </CountRow>
                <div>
                  {formatedValue(`${offer.hardCap}`) || '0.00'} {offer.investingTokenSymbol}
                </div>

                <CountRow>{offer?.closeDate ? moment(offer?.closeDate).format('DD/MM/YYYY') : ''}</CountRow>

                <DefaultRaw>{OFFER_STATUSES[offer.status]}</DefaultRaw>

                <ActionButtons>
                  <OutlineButton
                    color={theme.launchpad.colors.primary + '80'}
                    borderType="tiny"
                    height="34px"
                    onClick={() => viewItem(offer.id)}
                  >
                    Listing <ListingIcon />
                  </OutlineButton>

                  <OutlineButton
                    color={theme.launchpad.colors.primary + '80'}
                    borderType="tiny"
                    height="34px"
                    as={DiscreteInternalLink}
                    to={`/issuance/manage/${offer.issuanceId}`}
                  >
                    <GearIcon />
                  </OutlineButton>
                </ActionButtons>
              </IssuanceRow>
            ))}
        </IssuanceTable>
      )}

      <PaginationRow>
        <PageSizeDropdown ref={container} onClick={() => setShowDropdown((state) => !state)}>
          <PageSizeLabel>{pageSize}</PageSizeLabel>

          <PageSizeIcon isOpen={showDropdown}>
            <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
          </PageSizeIcon>

          {showDropdown && (
            <PageSizeOptions>
              {paginationSizes.map((option, idx) => (
                <PageSizeOption key={idx} onClick={() => onChangePageSize(option.value)}>
                  {option.label}
                </PageSizeOption>
              ))}
            </PageSizeOptions>
          )}
        </PageSizeDropdown>

        <PageCount>
          {(page - 1) * pageSize + 1} - {page * pageSize < totalItems ? page * pageSize : totalItems} of {totalItems}
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
  ${text17}

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const PageButton = styled.button`
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;

  ${text18}

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  ${(props) =>
    props.disabled &&
    `
    background: ${props.theme.launchpad.colors.disabled};
  `}

  ${(props) =>
    !props.disabled &&
    `
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
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeLabel = styled.div`
  ${text19}

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const PageSizeIcon = styled.div<{ isOpen: boolean }>`
  grid-area: icon;
  display: grid;
  place-content: center;

  > svg {
    transition: transofrm 0.4s;
    ${(props) => props.isOpen && 'transform: rotate(180deg);'};
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
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PageSizeOption = styled.div`
  padding: 0.5rem 1rem;
  ${text30}
  cursor: pointer;

  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`

import React, { useCallback } from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
import { AbstractOrder } from 'state/launchpad/types'
import { DashboardLbp, LbpStatus } from '../types'

import { SearchFilter, SearchConfig, OrderConfig } from './SearchFilter'
import { EmptyTable } from './EmptyTable'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LbpTable, TableHeader, LbpRow, Raw, DefaultRaw, CountRow, Title } from './tables'

import { useOnChangeOrder } from 'state/launchpad/hooks'
import { ReactComponent as EditIcon } from 'assets/svg/edit.svg'

import { DiscreteInternalLink } from 'theme'
import { text17, text18, text19, text30 } from 'components/LaunchpadMisc/typography'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { ITEM_ROWS } from 'components/LaunchpadIssuance/utils/constants'
import { TitleBox } from 'components/LaunchpadIssuance/IssuanceDashboard/TitleBox'

interface Props {
  type: string
}

const HEADERS = [
  { key: 'lbpName', label: 'Lbps' },
  { key: 'countInvestors', label: 'Investors' },
  { key: 'commitment', label: 'Commitment' },
  { key: 'progressPercent', label: 'Progress' },
  { key: 'hardCap', label: 'Total Funding' },
  { key: 'closeDate', label: 'Close Date' },
  { key: 'status', label: 'Stage' },
]

export const LbpsFull: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const getLbps = async (page: any, filter: any, order: any, type: any, pageSize: any) => {
    console.log(page, filter, order, type, pageSize)
    return [
      {
        name: 'Test 1',
        startDate: new Date(),
      },
      {
        name: 'Test 2',
        startDate: new Date(),
      },
    ]
  }

  const container = React.useRef<HTMLDivElement>(null)

  const [showDropdown, setShowDropdown] = React.useState(false)

  const [loading, setLoading] = React.useState<boolean>(true)
  const [lbps, setLbps] = React.useState<DashboardLbp[]>([])

  const [page, setPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(10)
  const [filter, setFilter] = React.useState<SearchConfig>(() => {
    const newFilter = localStorage.getItem('lbpsFullFilter')
    return newFilter ? (JSON.parse(newFilter) as SearchConfig) : { search: '', onlyMine: 'false' }
  })
  React.useEffect(() => {
    localStorage.setItem('lbpsFullFilter', JSON.stringify(filter))
  }, [filter])
  const [order, setOrder] = React.useState<OrderConfig>({})

  const viewItem = React.useCallback((id: number) => history.push(`/lbps/${id}`), [history])

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

    getLbps(page, filter, order, props.type, pageSize)
      .then((page: any) => {
        setLbps(page.items)
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
      setFilter((state: SearchConfig) => ({
        ...state,
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
      <TitleBox title={props.type} onlyMine={filter.onlyMine} setFilter={setFilter} />
      <SearchFilter search={filter.search} onFilter={onSearch} />

      {!loading && lbps?.length === 0 && <EmptyTable isSearch={Boolean(filter?.search)} />}

      {lbps?.length > 0 && (
        <LbpTable>
          <TableHeader tab={LbpStatus.live}>
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
            lbps.map((lbp, idx) => (
              <LbpRow key={idx} tab={LbpStatus.live}>
                <Raw>{lbp.name}</Raw>
                <CountRow>{lbp?.startDate ? moment(lbp?.startDate).format('DD/MM/YYYY') : ''}</CountRow>

                <DefaultRaw>{LbpStatus[lbp.status]}</DefaultRaw>

                <ActionButtons>
                  <OutlineButton
                    color={theme.launchpad.colors.primary + '80'}
                    borderType="tiny"
                    height="34px"
                    onClick={() => viewItem(lbp.id)}
                  >
                    Edit <EditIcon />
                  </OutlineButton>
                </ActionButtons>
              </LbpRow>
            ))}
        </LbpTable>
      )}

      <PaginationRow>
        <PageSizeDropdown ref={container} onClick={() => setShowDropdown((state) => !state)}>
          <PageSizeLabel>{pageSize}</PageSizeLabel>

          <PageSizeIcon isOpen={showDropdown}>
            <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
          </PageSizeIcon>

          {showDropdown && (
            <PageSizeOptions>
              {paginationSizes.map((option: any, idx: any) => (
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

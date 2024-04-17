import styled, { useTheme } from 'styled-components'
import { MoreHorizontal } from 'react-feather'
import { ManagedLbpInvestment, ManagedLbpInvestmentConfig } from 'state/lbp/types'
import { PaginationRes, AbstractOrder } from 'state/launchpad/types'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { EmptyTable } from 'components/LaunchpadIssuance/utils/EmptyTable'
import {
  ExtractButton,
  ExtractText,
  HeaderLabel,
  TableTitle,
} from 'components/LaunchpadIssuance/ManageOffer/shared/styled'
import { useOnChangeOrder } from 'state/launchpad/hooks'
import { useState, useEffect, useRef } from 'react'
import { useShowError } from 'state/application/hooks'
import { useGetAllLbpInvestors, useGetPaginatedLbpInvestors } from 'state/lbp/hooks'
import { GridContainer } from 'components/Grid'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
import { IssuanceFilter } from 'components/LaunchpadIssuance/types'
import { CSVLink } from 'react-csv'
import Link from 'react-csv/components/Link'

const HEADERS = [
  { key: 'username', label: 'Name' },
  { key: 'tokenAmount', label: 'No. of Tokens' },
]

interface Props {
  lbpId: number
}

export const InvestorInformation = ({ lbpId }: Props) => {
  const { load, error, isLoading, data } = useGetPaginatedLbpInvestors(lbpId)
  const showError = useShowError()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(8)
  const [order, setOrder] = useState<ManagedLbpInvestmentConfig>({})
  const { totalItems, totalPages, items } = data as PaginationRes<ManagedLbpInvestment>
  const theme = useTheme()
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)
  const csvRef = useRef<any>()
  const [csvData, setCsvData] = useState<ManagedLbpInvestment[]>([])
  const getAllInvestors = useGetAllLbpInvestors()

  const headers = [
    { label: 'Name', key: 'username' },
    { label: 'No. of Tokens', key: 'tokenAmount' },
    { label: 'Wallet Address', key: 'walletAddress' },
  ]

  const handleExtractData = () => {
    const data = getAllInvestors(lbpId)
    setCsvData(data)
  }

  useEffect(() => {
    if (csvData && csvData.length > 0 && csvRef && csvRef.current) {
      csvRef.current.link.click()
    }
  }, [csvData])

  useEffect(() => {
    load({
      page,
      order,
      offset: pageSize,
    })
  }, [page, order, pageSize])

  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error])

  return (
    <GridContainer style={{ display: 'block' }}>
      <Container>
        <Header>
          <TableTitle>Investor Information</TableTitle>
          <ButtonsContainer onClick={handleExtractData}>
            <MoreHorizontal color={theme.launchpad.colors.primary} size={13} />
            <ExtractText>Extract Data</ExtractText>
          </ButtonsContainer>
          <HiddenBlock>
            <CSVLink
              data={csvData}
              headers={headers}
              filename={`lbp-${lbpId}-investors.csv`}
              ref={csvRef}
              target="_blank"
            ></CSVLink>
          </HiddenBlock>
        </Header>
        {items.length > 0 && (
          <LbpTable maxWidth="100%" hideBorder>
            <TableHeader tab={IssuanceFilter.pending}>
              {HEADERS.map((header) => (
                <HeaderLabel onClick={() => onChangeOrder(header.key)} key={header.key}>
                  <SortIcon type={order[header.key as keyof ManagedLbpInvestmentConfig]} />
                  {header.label}
                </HeaderLabel>
              ))}
            </TableHeader>
            {isLoading && (
              <Centered>
                <Loader />
              </Centered>
            )}
            {!isLoading &&
              items.map((item, idx) => (
                <LbpRow key={idx} tab={IssuanceFilter.pending}>
                  <Raw>{item.username || '<Name Uknown>'}</Raw>
                  <Raw>{(+item.tokenAmount).toLocaleString()}</Raw>
                </LbpRow>
              ))}
          </LbpTable>
        )}
        {!isLoading && !totalItems && <EmptyTable title="No Investors" containerMaxWidth="100%" hideBorder />}
        <IssuancePagination
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={page}
          pageSize={pageSize}
          onChangePageSize={setPageSize}
          onChangePage={setPage}
        />
      </Container>
    </GridContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const LbpTable = styled.div<{ maxWidth?: string; hideBorder?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1320px'};

  margin: auto;
  // border: ${(props) => (props.hideBorder ? 'none' : `1px solid ${props.theme.launchpad.colors.border.default}`)};
  border-radius: 8px;
  > :nth-child(even) {
    // background: ${(props) => props.theme.launchpad.colors.foreground};
    border-width: 1px 0px 1px 0px;
    border-style: solid;
    border-color: #e6e6ffcc;
  }
`

export const TableHeader = styled.div<{ tab: IssuanceFilter }>`
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: 1fr auto;
  place-content: center start;
  align-items: center;
  gap: ${(props) => (props.tab === IssuanceFilter.pending ? '2rem' : '1rem')};
  height: 65px;
  width: 100%;
  padding: 0.25rem 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

export const LbpRow = styled(TableHeader)<{ tab: IssuanceFilter }>`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  opacity: 0.8;
`

export const Raw = styled.div`
  font-family: ${(props) => props.theme.launchpad.font};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HiddenBlock = styled.div`
  display: none;
`

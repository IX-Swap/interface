import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { MoreHorizontal } from 'react-feather'
import {
  ManagedOfferInvestment,
  PaginationRes,
  MOInvestmentOrderConfig,
  AbstractOrder,
  ManagedOffer,
} from 'state/launchpad/types'
import { IssuanceTable, TableHeader, IssuanceRow, Raw } from 'components/LaunchpadMisc/tables'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { IssuanceFilter } from 'components/LaunchpadIssuance/types'
import { formatDates } from '../utils'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { EmptyTable } from 'components/LaunchpadIssuance/utils/EmptyTable'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
import { ExtractButton, ExtractText, HeaderLabel, TableTitle } from '../shared/styled'
import { DiscreteInternalLink } from 'theme'
import { useOnChangeOrder } from 'state/launchpad/hooks'

interface Props {
  data: PaginationRes<ManagedOfferInvestment>
  order: MOInvestmentOrderConfig
  setOrder: (order: MOInvestmentOrderConfig) => void
  page: number
  setPage: (page: number) => void
  isLoading: boolean
  pageSize: number
  setPageSize: (page: number) => void
  offer: ManagedOffer
}

const HEADERS = [
  { key: 'username', label: 'Name' },
  { key: 'amount', label: 'Investment Amount' },
  { key: 'tokenAmount', label: 'Amount of tokens' },
  { key: 'createdAt', label: 'Purchase Date' },
]

export const OfferInvestmentsList = ({
  data,
  order,
  setOrder,
  page,
  setPage,
  isLoading,
  pageSize,
  setPageSize,
  offer,
}: Props) => {
  const { issuanceId, investingTokenSymbol, tokenSymbol } = offer
  const { totalItems, totalPages, items } = data
  const theme = useTheme()
  const onChangeOrder = useOnChangeOrder(order as AbstractOrder, setOrder, setPage)
  const extractLink = useMemo(() => `/issuance/extract/${issuanceId}?tab=investment&page=1`, [issuanceId])

  return (
    <Container>
      <Header>
        <TableTitle>Investor Information</TableTitle>
        <ButtonsContainer>
          <ExtractButton as={DiscreteInternalLink} to={extractLink}>
            <MoreHorizontal color={theme.launchpad.colors.primary} size={13} />
            <ExtractText>Extract Data</ExtractText>
          </ExtractButton>
        </ButtonsContainer>
      </Header>
      {items.length > 0 && (
        <IssuanceTable maxWidth="100%" hideBorder>
          <TableHeader tab={IssuanceFilter.pending}>
            {HEADERS.map((header) => (
              <HeaderLabel onClick={() => onChangeOrder(header.key)} key={header.key}>
                <SortIcon type={order[header.key as keyof MOInvestmentOrderConfig]} />
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
              <IssuanceRow key={idx} tab={IssuanceFilter.pending}>
                <Raw>{item.username || '<Name Uknown>'}</Raw>
                <Raw>{(+item.amount).toLocaleString() + ' ' + investingTokenSymbol}</Raw>
                <Raw>{(+item.tokenAmount).toLocaleString() + ' ' + tokenSymbol}</Raw>
                <Raw>{formatDates(item.createdAt)}</Raw>
              </IssuanceRow>
            ))}
        </IssuanceTable>
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
`

import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { MoreHorizontal } from 'react-feather'
import { ManagedOfferInvestment, MOInvestmentOrderConfig, PaginationRes } from 'state/launchpad/types'
import { IssuanceTable, TableHeader, IssuanceRow, Raw } from 'components/LaunchpadMisc/tables'
import { SortIcon } from 'components/LaunchpadIssuance/utils/SortIcon'
import { IssuanceFilter } from 'components/LaunchpadIssuance/types'
import { formatDates } from '../utils'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { EmptyTable } from 'components/LaunchpadIssuance/utils/EmptyTable'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
import { ExtractButton, ExtractText, HeaderLabel, TableTitle } from '../shared/styled'

interface Props {
  issuanceId: number
  data: PaginationRes<ManagedOfferInvestment>
  order: MOInvestmentOrderConfig
  setOrder: (order: MOInvestmentOrderConfig) => void
  page: number
  setPage: (page: number) => void
  isLoading: boolean
  pageSize: number
  setPageSize: (page: number) => void
}

export const OfferInvestmentsList = ({
  issuanceId,
  data,
  order,
  setOrder,
  page,
  setPage,
  isLoading,
  pageSize,
  setPageSize,
}: Props) => {
  const { totalItems, totalPages, items } = data
  const theme = useTheme()
  const history = useHistory()

  const onChangeOrder = React.useCallback(
    (key: string) => {
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
    },
    [order]
  )

  const onExtractData = () => {
    history.push(`/issuance/extract-offers/${issuanceId}?tab=investment&page=1`)
  }
  return (
    <Container>
      <Header>
        <TableTitle>Investor Information</TableTitle>
        <ButtonsContainer>
          <ExtractButton onClick={onExtractData}>
            <MoreHorizontal color={theme.launchpad.colors.primary} size={13} />
            <ExtractText>Extract Data</ExtractText>
          </ExtractButton>
        </ButtonsContainer>
      </Header>
      {items.length > 0 && (
        <IssuanceTable maxWidth="100%" hideBorder>
          <TableHeader tab={IssuanceFilter.pending}>
            <HeaderLabel onClick={() => onChangeOrder('username')}>
              <SortIcon type={order.username} />
              Name
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('amount')}>
              <SortIcon type={order.amount} />
              Investment Amount
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('tokenAmount')}>
              <SortIcon type={order.tokenAmount} />
              Amount of tokens
            </HeaderLabel>
            <HeaderLabel onClick={() => onChangeOrder('createdAt')}>
              <SortIcon type={order.createdAt} />
              Purchase Date
            </HeaderLabel>
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
                <Raw>{item.amount.toLocaleString()}</Raw>
                <Raw>{item.tokenAmount.toLocaleString()}</Raw>
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
        smallMargin={false}
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
  padding: 22px;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

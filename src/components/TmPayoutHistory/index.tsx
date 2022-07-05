import React, { useState, useEffect } from 'react'
import { t } from '@lingui/macro'
import dayjs from 'dayjs'

import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { Table } from 'components/Table'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useToken } from 'hooks/Tokens'
import { useGetPayoutHistory, useTokenManagerState } from 'state/token-manager/hooks'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { CopyAddress } from 'components/CopyAddress'
import { PayoutHistory } from 'state/token-manager/types'
import { PAYOUT_TYPE_LABEL } from 'components/TmPayoutEvents/constants'
import { useUserState } from 'state/user/hooks'
import { useAuthState } from 'state/auth/hooks'

import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, ViewBtn } from './styleds'

const headerCells = [
  t`Recipient's wallet`,
  t`Payout type`,
  t`SEC token`,
  t`Date/Time of claim`,
  t`Claimed tokens`,
  t`Transactions`,
]

export const TmPayoutHistory = () => {
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)

  const { account } = useUserState()
  const { token } = useAuthState()

  const { payoutHistory, isLoading } = useTokenManagerState()
  const getPayoutHistory = useGetPayoutHistory()

  useEffect(() => {
    if (account && token) {
      if (Object.keys(filters).length) {
        handleHaveFilters(true)
      }
      getPayoutHistory({ ...filters, offset: 10, page: 1 })
    }
  }, [filters, getPayoutHistory, account, token])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getPayoutHistory({ ...filters, page, offset: 10 })
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      {payoutHistory.items?.length || haveFilters ? (
        <Container>
          <MultipleFilters
            filters={[FILTERS.SEARCH, FILTERS.DATE_OF_CLAIM, FILTERS.SEC_TOKENS]}
            searchPlaceholder="Search by Wallet or ID"
            onFiltersChange={handleFilters}
            forManager
          />
          {payoutHistory.items?.length ? (
            <>
              <Table body={<Body items={payoutHistory.items} />} header={<Header />} />
              <Pagination
                totalPages={payoutHistory.totalPages}
                page={payoutHistory.page || 1}
                onPageChange={onPageChange}
              />
            </>
          ) : (
            <TmEmptyPage tab="payout-history" filtred />
          )}
        </Container>
      ) : (
        <TmEmptyPage tab="payout-history" />
      )}
    </>
  )
}

interface IRow {
  item: PayoutHistory
}

const Row = ({ item }: IRow) => {
  const {
    user: { ethAddress },
    payoutEvent: { payoutToken, secToken, type },
    createdAt,
    sum,
  } = item
  const token = useToken(payoutToken)

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined

  return (
    <StyledBodyRow>
      <div>
        <CopyAddress address={ethAddress} />
      </div>
      <div>{PAYOUT_TYPE_LABEL[type] || type}</div>
      <div>
        <CurrencyLogo currency={secCurrency} style={{ marginRight: 4 }} size="24px" />
        {secToken?.symbol || '-'}
      </div>
      <div>{dayjs(createdAt).format('MMM DD, YYYY - HH:mm')}</div>
      <div style={{ fontWeight: 500 }}>
        <CurrencyLogo currency={token} style={{ marginRight: 4 }} size="24px" />
        {token?.symbol || '-'}&nbsp;{sum}
      </div>

      <div>
        {/* TO DO - replace with txHash */}
        <ViewBtn href={'#'} target="_blank" rel="noopener">
          View
        </ViewBtn>
        {/* <ViewBtn href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener">
          View
        </ViewBtn> */}
      </div>
    </StyledBodyRow>
  )
}

interface IBody {
  items: PayoutHistory[]
}

const Body = ({ items }: IBody) => {
  return (
    <BodyContainer>
      {items.map((item) => (
        <Row item={item} key={`payout-${item.id}`} />
      ))}
    </BodyContainer>
  )
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>{cell}</div>
      ))}
    </StyledHeaderRow>
  )
}

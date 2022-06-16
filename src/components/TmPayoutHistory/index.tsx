import React, { useState, useEffect, useMemo } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { ButtonGradientBorder } from 'components/Button'
import { Table } from 'components/Table'
import { useSecTokenById } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { ReactComponent as EyeIcon } from 'assets/images/eye.svg'
import { useCurrency, useToken } from 'hooks/Tokens'
import { useGeyPayoutHistory, useTokenManagerState } from 'state/token-manager/hooks'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { CopyAddress } from 'components/CopyAddress'

import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, ViewBtn } from './styleds'
import { PAYOUT_TYPE_LABEL } from './constants'
import { PayoutHistory } from 'state/token-manager/types'

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

  const { payoutHistory, isLoading } = useTokenManagerState()
  const getPayoutHistory = useGeyPayoutHistory()

  useEffect(() => {
    if (Object.keys(filters).length) {
      handleHaveFilters(true)
    }
    getPayoutHistory({ ...filters, offset: 10 })
  }, [filters, getPayoutHistory])

  const onPageChange = (page: number) => {
    getPayoutHistory({ ...filters, page, offset: 10 })
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      {payoutHistory.items?.length || haveFilters ? (
        <Container>
          <MultipleFilters
            filters={[FILTERS.SEARCH, FILTERS.DATE_OF_CLAIM, FILTERS.SEC_TOKENS]}
            searchPlaceholder="Search by Wallet"
            onFiltersChange={handleFilters}
            callback={getPayoutHistory}
          />
          {payoutHistory.items?.length ? (
            <>
              <Table body={<Body items={payoutHistory.items} />} header={<Header />} />
              <Pagination
                totalPages={payoutHistory.totalPages}
                page={(payoutHistory.page || 1) - 1}
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
  const token = useCurrency(payoutToken)

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined
  const tokenCurrency = token ? new WrappedTokenInfo(token as any) : undefined

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
      <div>{dayjs(createdAt).format('MMM d, YYYY - HH:mm')}</div>
      <div style={{ fontWeight: 500 }}>
        <CurrencyLogo currency={tokenCurrency} style={{ marginRight: 4 }} size="24px" />
        {tokenCurrency?.symbol || '-'}&nbsp;{sum}
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

import React, { useState } from 'react'
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
import { useCurrency } from 'hooks/Tokens'
import { useGetMyPayout } from 'state/token-manager/hooks'

import { StatusCell } from './StatusCell'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer } from './styleds'
import { PAYOUT_TYPE_LABEL } from './constants'
import { Pagination } from 'components/Pagination'

const headerCells = [
  t`ID`,
  t`Status`,
  t`Payout type`,
  t`SEC token`,
  t`Payment period`,
  t`Record date`,
  t`Amount claimed`,
  '',
]

export const TmPayoutEvents = () => {
  const getMyPayouts = useGetMyPayout()
  const [page, handlePage] = useState(0)

  // TO DO - use real data
  const items = [
    {
      id: 1,
      status: 'draft',
      type: 'rewards',
      secTokenId: 3,
      payoutStartDate: new Date(),
      payoutEndDate: new Date(),
      recordDate: new Date(),
      amountCalimed: 100,
      total: 1200,
      tokenToClaimAddress: '0xdCFaB8057d08634279f8201b55d311c2a67897D2',
    },
    {
      id: 2,
      status: 'announced',
      type: 'rewards',
      secTokenId: 3,
      payoutStartDate: new Date(),
      recordDate: new Date(),
      total: 1200,
      tokenToClaimAddress: '0xdCFaB8057d08634279f8201b55d311c2a67897D2',
    },
  ]

  const fetch = (params: Record<string, any>) => {
    getMyPayouts(params)
  }

  const onEdit = () => {
    // TO DO - redirect to edit event
  }

  return (
    <Container>
      <MultipleFilters
        filters={[
          FILTERS.STATUS,
          FILTERS.PAYOUT_TYPE,
          FILTERS.SEC_TOKENS,
          FILTERS.PAYOUT_PERIOD,
          FILTERS.RECORD_DATE,
          FILTERS.PAYOUT_TOKEN,
        ]}
        callback={fetch}
      />
      <Table body={<Body onEdit={onEdit} items={items} />} header={<Header />} />
      <Pagination totalPages={12} page={page} onPageChange={handlePage} />
    </Container>
  )
}

interface IRow {
  item: any
  onEdit: (item: any) => void
}

const Row = ({ item, onEdit }: IRow) => {
  const {
    id,
    status,
    type,
    secTokenId,
    payoutStartDate,
    payoutEndDate,
    recordDate,
    amountCalimed,
    total,
    tokenToClaimAddress,
  } = item

  const secToken = useSecTokenById(secTokenId)

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined
  const currency = useCurrency(tokenToClaimAddress)

  const dateFormat = 'MMM d, YYYY'

  const clickView = () => {
    // TO DO - redirect to detailed event page
  }

  return (
    <StyledBodyRow>
      <div>#{id}</div>
      <div>
        <StatusCell status={status} />
      </div>
      <div>{PAYOUT_TYPE_LABEL[type] || type}</div>
      <div>
        <CurrencyLogo currency={secCurrency} style={{ marginRight: 4 }} size="24px" />
        {secToken?.symbol || '-'}
      </div>
      <div>
        {dayjs(payoutStartDate).format(dateFormat)}
        {Boolean(payoutEndDate) && (
          <>
            &nbsp;-
            <br />
            {dayjs(payoutEndDate).format(dateFormat)}
          </>
        )}
      </div>
      <div>{dayjs(recordDate).format(dateFormat)}</div>
      <div style={{ fontWeight: 500 }}>
        {amountCalimed ? (
          <>
            <CurrencyLogo currency={currency} style={{ marginRight: 4 }} size="24px" />
            {currency?.symbol || '-'}&nbsp;{amountCalimed}/{total}
          </>
        ) : (
          '-'
        )}
      </div>

      <div>
        <ButtonGradientBorder
          style={{ marginRight: 25 }}
          onClick={(e: any) => {
            e.preventDefault()
            e.stopPropagation()
            onEdit(item)
          }}
        >
          <Trans>Edit</Trans>
        </ButtonGradientBorder>
        <EyeIcon onClick={clickView} style={{ cursor: 'pointer' }} />
      </div>
    </StyledBodyRow>
  )
}

interface IBody {
  items: any[]
  onEdit: (item: any) => void
}

const Body = ({ items, onEdit }: IBody) => {
  return (
    <BodyContainer>
      {items.map((item) => (
        <Row onEdit={onEdit} item={item} key={`payout-${item.id}`} />
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

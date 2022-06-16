import React, { useEffect, useState } from 'react'
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
import { useGetMyPayout, useTokenManagerState } from 'state/token-manager/hooks'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { TmEmptyPage } from 'components/TmEmptyPage'

import { StatusCell } from './StatusCell'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, CreateButton } from './styleds'
import { PAYOUT_TYPE_LABEL } from './constants'

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
  const [filters, handleFilters] = useState<Record<string, any>>({})

  const { payoutList, isLoading } = useTokenManagerState()
  const getMyPayouts = useGetMyPayout()

  useEffect(() => {
    getMyPayouts({ ...filters, offset: 10 })
  }, [filters, getMyPayouts])

  const fetch = (params: Record<string, any>) => {
    getMyPayouts(params)
  }

  const onEdit = () => {
    // TO DO - redirect to edit event
  }

  const onPageChange = (page: number) => {
    fetch({ ...filters, page, offset: 10 })
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      {payoutList.items?.length ? (
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
            onFiltersChange={handleFilters}
          />
          <Table body={<Body onEdit={onEdit} items={payoutList.items} />} header={<Header />} />
          <Pagination
            totalPages={payoutList.totalPages}
            page={(payoutList.page || 1) - 1}
            onPageChange={onPageChange}
          />
        </Container>
      ) : (
        <TmEmptyPage tab="payout-events">
          <CreateButton>
            <Trans>Create Payout Event</Trans>
          </CreateButton>
        </TmEmptyPage>
      )}
    </>
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

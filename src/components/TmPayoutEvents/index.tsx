import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import { routes } from 'utils/routes'
import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { ButtonGradientBorder } from 'components/Button'
import { Table } from 'components/Table'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { ReactComponent as EyeIcon } from 'assets/images/eye.svg'
import { useCurrency } from 'hooks/Tokens'
import { useGetMyPayout, useTokenManagerState } from 'state/token-manager/hooks'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { PayoutEvent } from 'state/token-manager/types'
import { useUserState } from 'state/user/hooks'

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
  const history = useHistory()
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)

  const { account } = useUserState()
  const { payoutList, isLoading } = useTokenManagerState()
  const getMyPayouts = useGetMyPayout()

  useEffect(() => {
    if (account) {
      if (Object.keys(filters).length) {
        handleHaveFilters(true)
      }
      getMyPayouts({ ...filters, offset: 4, my: true })
    }
  }, [filters, getMyPayouts, account])

  const fetch = (params: Record<string, any>) => {
    getMyPayouts({ ...params, my: true })
  }

  const onEdit = () => {
    // TO DO - redirect to edit event
  }

  const onPageChange = (page: number) => {
    fetch({ ...filters, page, offset: 4 })
  }

  const goToCreate = () => {
    history.push(routes.createPayoutEvent)
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      {payoutList.items?.length || haveFilters ? (
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
          {payoutList.items?.length ? (
            <>
              <Table body={<Body onEdit={onEdit} items={payoutList.items} />} header={<Header />} />
              <Pagination totalPages={payoutList.totalPages} page={payoutList.page || 1} onPageChange={onPageChange} />
            </>
          ) : (
            <TmEmptyPage tab="payout-events" filtred />
          )}
        </Container>
      ) : (
        <TmEmptyPage tab="payout-events">
          <CreateButton onClick={goToCreate}>
            <Trans>Create Payout Event</Trans>
          </CreateButton>
        </TmEmptyPage>
      )}
    </>
  )
}

interface IRow {
  item: PayoutEvent
  onEdit: (item: PayoutEvent) => void
}

const Row = ({ item, onEdit }: IRow) => {
  const history = useHistory()

  const { id, status, type, secToken, startDate, endDate, recordDate, tokenAmount, payoutToken } = item
  const amountClaimed = 0

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined
  const currency = useCurrency(payoutToken)

  const dateFormat = 'MMM d, YYYY'

  const clickView = () => {
    history.push(routes.payoutItem(id))
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
        {dayjs(startDate).format(dateFormat)}
        {Boolean(endDate) && (
          <>
            &nbsp;-
            <br />
            {dayjs(endDate).format(dateFormat)}
          </>
        )}
      </div>
      <div>{dayjs(recordDate).format(dateFormat)}</div>
      <div style={{ fontWeight: 500 }}>
        {amountClaimed ? (
          <>
            <CurrencyLogo currency={currency} style={{ marginRight: 4 }} size="24px" />
            {currency?.symbol || '-'}&nbsp;{amountClaimed}/{tokenAmount}
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
  items: PayoutEvent[]
  onEdit: (item: PayoutEvent) => void
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

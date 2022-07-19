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
import { useAuthState } from 'state/auth/hooks'
import { useDeletePayoutItem, usePayoutState } from 'state/payout/hooks'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { ReactComponent as DeleteIcon } from 'assets/images/delete-basket.svg'
import { PAYOUT_STATUS } from 'constants/enums'

import { StatusCell } from './StatusCell'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, CreateButton, ActionsContainer } from './styleds'
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
  const { token } = useAuthState()
  const { payoutList, isLoading } = useTokenManagerState()
  const { loadingRequest } = usePayoutState()
  const getMyPayouts = useGetMyPayout()

  useEffect(() => {
    if (account && token) {
      if (Object.keys(filters).length) {
        handleHaveFilters(true)
      }
      getMyPayouts({ ...filters, offset: 10, my: true, page: 1 })
    }
  }, [filters, getMyPayouts, account, token])

  const fetch = (params: Record<string, any>) => {
    getMyPayouts({ ...params, my: true })
  }

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch({ ...filters, page, offset: 10 })
  }

  const goToCreate = () => {
    history.push(routes.createPayoutEvent)
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading || loadingRequest} />
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
            forManager
          />
          {payoutList.items?.length ? (
            <>
              <Table body={<Body items={payoutList.items} />} header={<Header />} />
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
}

const Row = ({ item }: IRow) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const deletePayout = useDeletePayoutItem()
  const history = useHistory()

  const { id, status, type, secToken, startDate, endDate, recordDate, tokenAmount, payoutToken } = item
  const amountClaimed = 0

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined
  const currency = useCurrency(payoutToken)

  const dateFormat = 'MMM DD, YYYY'

  const clickView = () => {
    history.push({ pathname: routes.payoutItemManager(id) })
  }

  const onDelete = () => {
    toggleIsWarningOpen()
    deletePayout(id)
  }

  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)

  const onEdit = () => {
    history.push(`/payout/edit/${id}`)
  }

  return (
    <>
      <AreYouSureModal onAccept={onDelete} onDecline={toggleIsWarningOpen} isOpen={isWarningOpen} />
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

        <ActionsContainer>
          {status === PAYOUT_STATUS.DRAFT && <DeleteIcon onClick={toggleIsWarningOpen} />}
          <ButtonGradientBorder
            onClick={(e: any) => {
              e.preventDefault()
              e.stopPropagation()
              onEdit()
            }}
          >
            <Trans>Edit</Trans>
          </ButtonGradientBorder>
          <EyeIcon onClick={clickView} style={{ cursor: 'pointer' }} />
        </ActionsContainer>
      </StyledBodyRow>
    </>
  )
}

interface IBody {
  items: PayoutEvent[]
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

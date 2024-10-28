import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { useHistory, useLocation } from 'react-router-dom'
import { Flex } from 'rebass'
import { routes } from 'utils/routes'
import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { Table } from 'components/Table'
import { ReactComponent as CreateIcon } from 'assets/images/add.svg'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReactComponent as EyeIcon } from 'assets/images/gray_eye_icon.svg'
import { ReactComponent as EditIcon } from 'assets/images/gray_edit_icon.svg'
import { useSafeCurrency } from 'hooks/Tokens'
import { useGetMyPayout, useTokenManagerState } from 'state/token-manager/hooks'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { PayoutEvent } from 'state/token-manager/types'
import { useRole, useUserState } from 'state/user/hooks'
import { useAuthState } from 'state/auth/hooks'
import { useDeletePayoutItem } from 'state/payout/hooks'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { MouseoverTooltip } from 'components/Tooltip'
import { ReactComponent as DeleteIcon } from 'assets/images/delete-basket.svg'
import { PAYOUT_STATUS } from 'constants/enums'
import { StatusCell } from './StatusCell'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, ActionsContainer } from './styleds'
import { PAYOUT_TYPE, PAYOUT_TYPE_LABEL } from './constants'
import { TYPE } from 'theme'
import { Line } from 'components/Line'
import { PinnedContentButton } from 'components/Button'
import { TokenLogo } from 'components/TokenLogo'
import { adminOffset as offset } from 'state/admin/constants'
const headerCells = [`ID`, 'Event name', `Status`, `Payout type`, `SEC token`, `Payment period`, `Amount claimed`, '']

export const TmPayoutEvents = () => {
  const { isAdmin } = useRole()
  const history = useHistory()
  const { pathname } = useLocation()
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)
  const { account } = useUserState()
  const { token } = useAuthState()
  const { payoutList, isLoading } = useTokenManagerState()
  const getMyPayouts = useGetMyPayout()

  useEffect(() => {
    if (account && token) {
      const filtersApplied = Object.keys(filters).length > 0
      handleHaveFilters(filtersApplied)
      if (!payoutList.items?.length || filtersApplied) {
        getMyPayouts({ ...filters, offset: offset, my: !isAdmin, page: payoutList.page })
          .then((response) => {
            if (!response.items?.length) {
            }
          })
          .catch((error) => {
            console.error('Failed to fetch data:', error)
          })
      } else {
        getMyPayouts({ offset: offset, my: !isAdmin, page: payoutList.page })
      }
    }
  }, [JSON.stringify(filters), account, token, pathname, isAdmin])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getMyPayouts({ ...filters, page, offset: offset, my: !isAdmin })
  }

  const goToCreate = () => {
    history.push(routes.createPayoutEvent)
  }

  return (
    <>
      <LoadingIndicator noOverlay={true} isLoading={isLoading && payoutList.items?.length === 0} />
      {payoutList.items?.length || haveFilters ? (
        <Container>
          <MultipleFilters
            isClearable
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
              <Line style={{ marginTop: '20px' }} />
              <Flex flexDirection="column" style={{ gap: 32 }}>
                <Table body={<Body items={payoutList.items} />} header={<Header />} />
                <Pagination
                  totalItems={payoutList.totalItems}
                  totalPages={payoutList.totalPages}
                  page={payoutList.page || 1}
                  onPageChange={onPageChange}
                />
              </Flex>
            </>
          ) : (
            <TmEmptyPage tab="payout-events" filtred />
          )}
        </Container>
      ) : (
        <TmEmptyPage tab="payout-events">
          <PinnedContentButton style={{ width: '240px', gap: '10px', margin: '30px 0px' }} onClick={goToCreate}>
            <CreateIcon />
            <Trans>Create Payout Event</Trans>
          </PinnedContentButton>
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

  const { id, status, type, secToken, startDate, endDate, recordDate, tokenAmount, payoutToken, claimed, title } = item

  const currency = useSafeCurrency(payoutToken)
  const dateFormat = 'MMM DD, YYYY'

  const clickView = () => {
    history.push({ pathname: routes.payoutItemManager(id) })
  }

  const splitClaimedAmount = (_amount: string | number) => {
    const amount = _amount.toString()
    const result = amount.substring(amount.indexOf('.') + 1)
    return result.length > 0 ? Number(amount).toFixed(4) : result
  }

  const onDelete = () => {
    toggleIsWarningOpen()
    deletePayout(id)
  }

  const toggleIsWarningOpen = () => setIsWarningOpen((state) => !state)

  const amountClaimed = claimed ? splitClaimedAmount(type === PAYOUT_TYPE.AIRDROPS ? tokenAmount : claimed) : null
  const formatedTokenAmount = splitClaimedAmount(tokenAmount)

  const onEdit = () => {
    history.push(`/payout/edit/${id}`)
  }

  const tooltipText = `Token: ${currency?.symbol || '-'} 
  Token amount: ${formatedTokenAmount}
  Claimed: ${amountClaimed}`

  return (
    <>
      <AreYouSureModal onAccept={onDelete} onDecline={toggleIsWarningOpen} isOpen={isWarningOpen} />
      <StyledBodyRow>
        <TYPE.main1 color={'#B8B8CC'}>#{id}</TYPE.main1>
        <TYPE.main1 style={{ marginRight: 20 }}>{title}</TYPE.main1>
        <div>
          <StatusCell status={status} />
        </div>
        <TYPE.main1>{PAYOUT_TYPE_LABEL[type] || type}</TYPE.main1>
        <div style={{ gap: '8px' }}>
          {secToken?.logo ? <TokenLogo logo={secToken.logo.public} width="32px" height="32px" /> : null}
          <TYPE.main1 color={'#8F8FB2'}>{secToken?.symbol || '-'}</TYPE.main1>
        </div>
        <div style={{ display: 'block' }}>
          <TYPE.main1>
            {dayjs(startDate).format(dateFormat)}
            {Boolean(endDate) && (
              <>
                &nbsp;- &nbsp;
                {dayjs(endDate).format(dateFormat)}
              </>
            )}
          </TYPE.main1>
          <TYPE.main1>
            <strong>Record on: {dayjs(recordDate).format(dateFormat)}</strong>
          </TYPE.main1>
        </div>
        <TYPE.main1 style={{ fontWeight: 500 }}>
          {amountClaimed ? (
            <div style={{ display: 'block' }}>
              <MouseoverTooltip text={tooltipText} textStyle={{ whiteSpace: 'pre-line' }}>
                <Flex alignItems="center">
                  <CurrencyLogo currency={currency} style={{ marginRight: 4 }} />
                  {currency?.symbol || '-'}&nbsp;
                </Flex>
                <TYPE.main1>
                  {amountClaimed}&nbsp;/&nbsp;
                  {formatedTokenAmount}
                </TYPE.main1>
              </MouseoverTooltip>
            </div>
          ) : (
            '-'
          )}
        </TYPE.main1>

        <ActionsContainer>
          {status === PAYOUT_STATUS.DRAFT && <DeleteIcon onClick={toggleIsWarningOpen} />}
          {status !== PAYOUT_STATUS.ENDED && (
            <EditIcon
              onClick={(e: any) => {
                e.preventDefault()
                e.stopPropagation()
                onEdit()
              }}
            ></EditIcon>
          )}
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
      {items.map((item, index) => (
        <React.Fragment key={`payout-${item.id}`}>
          <Line />
          <Row item={item} />
          {index === items.length - 1 && <Line />}
        </React.Fragment>
      ))}
    </BodyContainer>
  )
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>
          <TYPE.main1 color={'#B8B8CC'}>{cell}</TYPE.main1>
        </div>
      ))}
    </StyledHeaderRow>
  )
}

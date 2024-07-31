import { useEffect, useState } from 'react'

import { BodyContainer, Container, PayoutHistoryBody, PayoutHistoryFilter, StyledBodyRow, StyledHeaderRow, ViewBtn } from './styleds'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useGetPayoutHistory, usePayoutState } from 'state/payout/hooks'
import { TmPayoutHistory } from 'components/TmPayoutHistory'
import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { useUserState } from 'state/user/hooks'
import { useAuthState } from 'state/auth/hooks'
import { Flex } from 'rebass'
import { Table } from 'components/Table'
import { Pagination } from 'components/Pagination'
import { CopyAddress } from 'components/CopyAddress'
import { useToken } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { PayoutHistory } from 'state/payout/types'
import { UserPayoutEmptyPage } from 'components/UserPayoutEmptyPage '
import CurrencyLogo from 'components/CurrencyLogo'
import dayjs from 'dayjs'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { Trans } from '@lingui/macro'
import { PAYOUT_TYPE_LABEL } from 'components/UserPayoutEvents/constants'

const headerCells = [
  `Recipient's wallet`,
  `Payout type`,
  `SEC token`,
  `Date/Time of claim`,
  `Claimed tokens`,
  `Transactions`,
]

export default function UserPayoutHistory() {
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)
  const { payoutHistory, loadingRequest } = usePayoutState()

  const { account } = useUserState()
  const { token } = useAuthState()

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

  console.log({ payoutHistory })

  return (
    <Container>
      <PayoutHistoryBody>
        <PayoutHistoryFilter>
          <MultipleFilters
            filters={[FILTERS.SEARCH, FILTERS.DATE_OF_CLAIM, FILTERS.SEC_TOKENS]}
            searchPlaceholder="Search by Wallet or ID"
            onFiltersChange={handleFilters}
            fullWidth={false}
          />
        </PayoutHistoryFilter>
        {payoutHistory.items?.length ? (
            <Flex flexDirection="column" style={{ gap: 32 }}>
              <Table body={<Body items={payoutHistory.items} />} header={<Header />} />
              <Pagination
                totalPages={payoutHistory.totalPages}
                page={payoutHistory.page || 1}
                onPageChange={onPageChange}
              />
            </Flex>
          ) : (
            <UserPayoutEmptyPage tab="payout-history" filtered />
          )}
      </PayoutHistoryBody>
    </Container>
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
    txHash,
  } = item
  const token = useToken(payoutToken)
  const { chainId } = useActiveWeb3React()

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
        {token?.symbol || '-'}&nbsp;{Number(sum).toFixed(4)}
      </div>

      <div>
        <ViewBtn
          href={getExplorerLink(chainId || 137, txHash, ExplorerDataType.TRANSACTION)}
          target="_blank"
          rel="noopener"
        >
          View
        </ViewBtn>
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
        <div key={cell}>
          <Trans>{cell}</Trans>
        </div>
      ))}
    </StyledHeaderRow>
  )
}

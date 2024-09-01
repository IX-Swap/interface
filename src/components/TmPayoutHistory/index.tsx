import React, { useState, useEffect, useRef } from 'react'
import { Trans, t } from '@lingui/macro'
import dayjs from 'dayjs'
import { Flex } from 'rebass'

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
import { useActiveWeb3React } from 'hooks/web3'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import polygonLogoUrl from 'assets/images/polygon.svg'
import baseLogoUrl from 'assets/images/base.svg'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, ViewBtn } from './styleds'
import { Line } from 'components/Line'
import { TYPE } from 'theme'

const headerCells = [
  `Recipient's wallet`,
  `Payout type`,
  `SEC token`,
  `Date/Time of claim`,
  `Claimed tokens`,
  `Transactions`,
]

export const TmPayoutHistory = () => {
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const [haveFilters, handleHaveFilters] = useState(false)
  const { account } = useUserState()
  const { token } = useAuthState()
  const [hasMoreData, setHasMoreData] = useState(true)
  const { payoutHistory, isLoading } = useTokenManagerState()
  const getPayoutHistory = useGetPayoutHistory()

  useEffect(() => {
    if (account && token && hasMoreData) {
      const filtersApplied = Object.keys(filters).length > 0;
      const shouldFetch = !payoutHistory.items?.length || filtersApplied;
      handleHaveFilters(filtersApplied);

      if (shouldFetch) {
        getPayoutHistory({ ...filters, offset: 10, page: 1 })
          .then((response) => {
            if (response.items?.length === 0) {
              setHasMoreData(false)
            }
          })
          .catch((error) => {
            console.error('Failed to fetch data:', error)
          })
      }
    }
  },  [account, token, filters, hasMoreData]);

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getPayoutHistory({ ...filters, page, offset: 10 })
  }

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />

      {payoutHistory.items?.length || haveFilters ? (
        <>
          <Container style={{ marginTop: '20px' }}>
            <MultipleFilters
              filters={[FILTERS.SEARCH, FILTERS.DATE_OF_CLAIM, FILTERS.SEC_TOKENS]}
              searchPlaceholder="Search by Wallet or ID"
              onFiltersChange={handleFilters}
              forManager
            />
          </Container>

          <Line style={{ width: 'webkit-fill-available' }} />

          <Container>
            {payoutHistory.items?.length ? (
              <Flex flexDirection="column" style={{ gap: 32 }}>
                <Table header={<Header />} body={<Body items={payoutHistory.items} />} />

                <Pagination
                  totalPages={payoutHistory.totalPages}
                  page={payoutHistory.page || 1}
                  onPageChange={onPageChange}
                  totalItems={payoutHistory.totalItems}
                />
              </Flex>
            ) : (
              <TmEmptyPage tab="payout-history" filtred />
            )}
          </Container>
        </>
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
    txHash,
  } = item
  const token = useToken(payoutToken)
  const { chainId } = useActiveWeb3React()

  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined

  return (
    <StyledBodyRow>
      <TYPE.main1 color={'#B8B8CC'}>
        <CopyAddress address={ethAddress} />
      </TYPE.main1>

      <TYPE.main1>{PAYOUT_TYPE_LABEL[type] || type}</TYPE.main1>

      {/* The logo URL is currently hardcoded; we'll render it dynamically with the network key later */}
      <div style={{ position: 'relative' }}>
        <CurrencyLogo currency={secCurrency} style={{ marginRight: 4 }} size="24px" />
        <img style={{ position: 'absolute', left: '30px', bottom: '40px', width: '18px' }} src={baseLogoUrl}></img>
        {secToken?.symbol || '-'}
      </div>
      <TYPE.main1>{dayjs(createdAt).format('MMM DD, YYYY - HH:mm')}</TYPE.main1>

      {/* The logo URL is currently hardcoded; we'll render it dynamically with the network key later */}
      <div style={{ fontWeight: 500 }}>
        <div style={{ position: 'relative' }}>
          <CurrencyLogo currency={token} style={{ marginRight: 4 }} size="24px" />
          <img style={{ position: 'absolute', left: '20px', bottom: '20px', width: '18px' }} src={polygonLogoUrl}></img>
        </div>

        <TYPE.main1>
          {token?.symbol || '-'}&nbsp;{Number(sum).toFixed(4)}
        </TYPE.main1>
      </div>
      <div>
        {/* TO DO - replace with txHash */}
        <ViewBtn
          href={getExplorerLink(chainId || 137, txHash, ExplorerDataType.TRANSACTION)}
          target="_blank"
          rel="noopener"
        >
          View on Explorer
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
      {items.map((item, index) => (
        <React.Fragment key={`payout-${item.id}`}>
          <Line />
          <Row item={item} key={`payout-${item.id}`} />
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

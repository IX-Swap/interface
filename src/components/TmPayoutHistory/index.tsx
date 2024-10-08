import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import { adminOffset as offset } from 'state/admin/constants'
import { MultipleFilters } from 'components/MultipleFilters'
import { FILTERS } from 'components/MultipleFilters/constants'
import { Table } from 'components/Table'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useSafeCurrency } from 'hooks/Tokens'
import { useGetPayoutHistory, useTokenManagerState } from 'state/token-manager/hooks'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { Pagination } from 'components/Pagination'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { CopyAddress } from 'components/CopyAddress'
import { PayoutHistory } from 'state/token-manager/types'
import { PAYOUT_TYPE_LABEL } from 'components/TmPayoutEvents/constants'
import { useUserState } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { Container, StyledBodyRow, StyledHeaderRow, BodyContainer, ViewBtn } from './styleds'
import { Line } from 'components/Line'
import { TYPE } from 'theme'
import dayjs from 'dayjs'
import { getChainLogoByChainId, getChainLogoUrl } from 'chains'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const headerCells = [
  `Recipient's wallet`,
  `Event name`,
  `Payout type`,
  `SEC token`,
  `Date/Time of claim`,
  `Claimed tokens`,
  `Transactions`,
]

export const TmPayoutHistory = () => {
  const [filters, handleFilters] = useState<Record<string, any>>({})
  const { account } = useUserState()
  const { payoutHistory, isLoading } = useTokenManagerState()
  const getPayoutHistory = useGetPayoutHistory()
  const { pathname } = useLocation()

  useEffect(() => {
    fetchPayoutHistory(payoutHistory.page)
  }, [account, JSON.stringify(filters), pathname])

  const fetchPayoutHistory = (page: number) => {
    getPayoutHistory({ ...filters, offset: offset, page })
      .then((response) => {
        if (response.items?.length === 0) {
        }
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getPayoutHistory({ ...filters, page, offset: offset })
  }

  if (isLoading && !filters) {
    return <LoadingIndicator noOverlay={true} isLoading={isLoading} />
  }
  return (
    <>
      <Container style={{ marginTop: '20px' }}>
        <MultipleFilters
          filters={[FILTERS.SEARCH, FILTERS.DATE_OF_CLAIM, FILTERS.SEC_TOKENS]}
          searchPlaceholder="Search by Wallet or ID"
          onFiltersChange={handleFilters}
          forManager
          isClearable
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
          <TmEmptyPage tab="payout-history" filtred={Object.keys(filters)?.length > 0} />
        )}
      </Container>
    </>
  )
}

interface IRow {
  item: PayoutHistory
}

const Row = ({ item }: IRow) => {
  const {
    user: { ethAddress },
    payoutEvent: { title, payoutToken, secToken, type },
    createdAt,
    sum,
    txHash,
  } = item

  const token = useSafeCurrency(payoutToken)
  const { chainId } = useActiveWeb3React()
  const secCurrency = secToken ? new WrappedTokenInfo(secToken) : undefined
  const secTokenLogoUrl = getChainLogoUrl(secToken?.network)
  const payoutTokenLogoUrl = getChainLogoByChainId(token?.chainId)

  return (
    <StyledBodyRow>
      <TYPE.main1 color={'#B8B8CC'}>
        <CopyAddress address={ethAddress} />
      </TYPE.main1>

      <TYPE.main1 style={{ marginRight: 20 }}>{title}</TYPE.main1>

      <TYPE.main1>{PAYOUT_TYPE_LABEL[type] || type}</TYPE.main1>
      <TokenContainer>
        {secCurrency ? <CurrencyLogo currency={secCurrency} style={{ marginRight: 4 }} size="24px" /> : null}
        {secTokenLogoUrl && <NetworkLogo src={secTokenLogoUrl} alt="network logo" />}
        <TYPE.main1 marginLeft={'5px'}>{secToken?.symbol || '-'}</TYPE.main1>
      </TokenContainer>

      <TYPE.main1>{dayjs(createdAt).format('MMM DD, YYYY - HH:mm')}</TYPE.main1>
      <TokenSymbol>
        <TokenContainer>
          <CurrencyLogo currency={token} style={{ marginRight: 4 }} size="24px" />
          {payoutTokenLogoUrl && <PayoutLogo src={payoutTokenLogoUrl} alt="network logo" />}
        </TokenContainer>
        <TYPE.main1>
          {token?.symbol || '-'}&nbsp;{Number(sum).toFixed(4)}
        </TYPE.main1>
      </TokenSymbol>

      <div>
        <ViewBtn
          href={getExplorerLink(chainId || 137, txHash, ExplorerDataType.TRANSACTION)}
          target="_blank"
          rel="noopener"
        >
          View on Explorer
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

const TokenContainer = styled.div`
  position: relative;
`

const TokenSymbol = styled.div`
  font-weight: 500;
`

const NetworkLogo = styled.img`
  position: absolute;
  left: 30px;
  bottom: 40px;
  width: 18px;
`

const PayoutLogo = styled.img`
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 18px;
`

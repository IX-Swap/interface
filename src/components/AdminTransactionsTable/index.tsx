import { t, Trans } from '@lingui/macro'
import { LoaderThin } from 'components/Loader/LoaderThin'
import dayjs from 'dayjs'
import { Copy } from 'react-feather'
import styled from 'styled-components'
import React, { FC, useEffect, useState } from 'react'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

import { Search } from 'components/Search'
import { useAdminState, useFetchBrokerDealerSwaps, useOnlyAdminAccess } from 'state/admin/hooks'
import { Pagination } from 'components/AdminAccreditationTable/Pagination'
import { BrokerDealerSwapItem } from 'state/admin/actions'
import { useCurrency } from 'hooks/Tokens'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ExternalLink, TYPE } from 'theme'
import { adminOffset as offset } from 'state/admin/constants'
import { getExplorerName } from 'hooks/useExplorerName'
import { CopyAddress } from 'components/CopyAddress'
import { NoData } from 'components/UsersList/styleds'

import { BodyRow, HeaderRow, Table } from '../Table'
import { isMobile } from 'react-device-detect'
import { lineHeight } from 'styled-system'

interface RowProps {
  item: BrokerDealerSwapItem
}

export const StyledCopy = styled(Copy)`
  margin-left: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`

const headerCells = [t`Date`, t`Name`, t`Trader's wallet`, t`Trading pair`, t`Amount`, t`Response`, t`Status`]

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>{cell}</div>
      ))}
    </StyledHeaderRow>
  )
}

const Row: FC<RowProps> = ({ item }: RowProps) => {
  const {
    id,
    data: { amount, tokenAddress, pairSymbol },
    user: { ethAddress },
    brokerDealer: { name: broker },
    status,
    token,
    createdAt,
    transactionHash,
  } = item
  const currency = useCurrency(tokenAddress)
  return (
    <StyledBodyRow key={`transaction-${id}`}>
      <div style={{fontSize: '14px'}}>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div style={{fontSize: '14px'}}>{broker}</div>
      <Wallet style={{fontSize: '14px'}}>
        <CopyAddress  address={ethAddress} />
      </Wallet>
      <div style={{fontSize: '14px'}}>{`${pairSymbol?.split('-')?.join(' > ') ?? token?.symbol}`}</div>
      <div style={{fontSize: '14px'}}>
        {currency ? `${CurrencyAmount.fromRawAmount(currency as Currency, amount).toFixed()} ${token?.symbol}` : ''}
      </div>
      <div  style={{ textTransform: 'capitalize', fontSize: '14px' }}>{status}</div>
      <div style={{fontSize: '14px'}}>
        {transactionHash && currency?.chainId && (
          <ExternalLink href={getExplorerLink(currency.chainId, transactionHash, ExplorerDataType.TRANSACTION)}>
            <span style={{ color: '#6666ff', textDecoration: 'none' }}>
              {' '}
              View on {getExplorerName(currency.chainId)}
            </span>
          </ExternalLink>
        )}
      </div>
    </StyledBodyRow>
  )
}

const Body = () => {
  const {
    brokerDealerSwaps: { items },
  } = useAdminState()

  return (
    <>
      {items?.map((item, id) => (
        <Row item={item} key={`transaction-${id}`} />
      ))}
    </>
  )
}

export const AdminTransactionsTable = () => {
  useOnlyAdminAccess()
  const {
    brokerDealerSwaps: { items, page, totalPages },
    adminLoading,
  } = useAdminState()
  const [searchValue, setSearchValue] = useState('')
  const getBrokerDealerSwaps = useFetchBrokerDealerSwaps()

  useEffect(() => {
    getBrokerDealerSwaps({
      page: 1,
      offset,
      ...(searchValue && { search: searchValue }),
    })
  }, [getBrokerDealerSwaps, searchValue])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getBrokerDealerSwaps({ page, offset, ...(searchValue && { search: searchValue }) })
  }

  return (
    <div style={{ margin: isMobile ? '30px 10px 0px 20px'  : '30px 80px 0px 40px' }}>
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      <TYPE.title4
        fontSize={isMobile ? '29px' : '40px'}
        lineHeight={isMobile ? '40px' : '56px'}
        marginTop={isMobile ? '35px' : ''}
        marginBottom="30px"
        data-testid="securityTokensTitle"
      >
        <Trans>Broker Dealer Transactions</Trans>
      </TYPE.title4>
      <Search setSearchValue={setSearchValue} placeholder={t`Search for Wallet`} />
      {items?.length === 0 ? (
        <NoData>
          <Trans>No results</Trans>
        </NoData>
      ) : (
        <Container >
          <Table body={<Body />} header={<Header />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </Container>
      )}
    </div>
  )
}

export default AdminTransactionsTable

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`

const Wallet = styled.div`
  color: #b8b8cc;
  // background: ${({ theme: { bgG3 } }) => bgG3};
  // -webkit-background-clip: text;
  // background-clip: text;
  // -webkit-text-fill-color: transparent;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 2fr 1fr 1fr;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 2fr 1fr 1fr;
  min-width: 1270px;
`

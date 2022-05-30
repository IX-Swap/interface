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
import useCopyClipboard from 'hooks/useCopyClipboard'
import { BrokerDealerSwapItem } from 'state/admin/actions'
import { useCurrency } from 'hooks/Tokens'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ExternalLink } from 'theme'
import { adminOffset as offset } from 'state/admin/constants'
import { getExplorerName } from 'hooks/useExplorerName'
import { CopyAddress } from 'components/CopyAddress'
import { NoData } from 'components/UsersList/styleds'

import { BodyRow, HeaderRow, Table } from '../Table'

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
  const [copied, setCopied] = useCopyClipboard()
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
      <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div>{broker}</div>
      <Wallet>
        <CopyAddress address={ethAddress} copied={copied} setCopied={setCopied} />
      </Wallet>
      <div>{`${pairSymbol?.split('-')?.join(' > ') ?? token?.symbol}`}</div>
      <div>
        {currency ? `${CurrencyAmount.fromRawAmount(currency as Currency, amount).toFixed()} ${token?.symbol}` : ''}
      </div>
      <div style={{ textTransform: 'capitalize' }}>{status}</div>
      <div>
        {transactionHash && currency?.chainId && (
          <ExternalLink href={getExplorerLink(currency.chainId, transactionHash, ExplorerDataType.TRANSACTION)}>
            View on {getExplorerName(currency.chainId)}
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
    <>
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      <Search setSearchValue={setSearchValue} placeholder={t`Search for Wallet`} />
      {items?.length === 0 ? (
        <NoData>
          <Trans>No results</Trans>
        </NoData>
      ) : (
        <Container>
          <Table body={<Body />} header={<Header />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </Container>
      )}
    </>
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
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

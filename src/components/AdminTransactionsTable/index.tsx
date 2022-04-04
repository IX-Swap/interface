import { t, Trans } from '@lingui/macro'
import { LoaderThin } from 'components/Loader/LoaderThin'
import dayjs from 'dayjs'
import { Copy } from 'react-feather'
import styled from 'styled-components'
import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'

import { Input as SearchInput } from '../AdminAccreditationTable/Search'
import { isAddress } from 'utils'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { useAdminState, useFetchBrokerDealerSwaps } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { BodyRow, HeaderRow, Table } from '../Table'
import { Pagination } from 'components/AdminAccreditationTable/Pagination'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { BrokerDealerSwapItem } from 'state/admin/actions'
import { useCurrency } from 'hooks/Tokens'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ExternalLink } from 'theme'
import { adminOffset as offset } from 'state/admin/constants'
import { getExplorerName } from 'hooks/useExplorerName'

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
let timer = null as any

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
        {copied ? (
          <Trans>Copied</Trans>
        ) : (
          <>
            {shortenAddress(ethAddress || '')}
            <IconWrapper size={18} onClick={() => setCopied(ethAddress || '')}>
              <StyledCopy />
            </IconWrapper>
          </>
        )}
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
  const {
    brokerDealerSwaps: { items, page, totalPages },
    adminLoading,
  } = useAdminState()
  const [searchValue, setSearchValue] = useState('')
  const getBrokerDealerSwaps = useFetchBrokerDealerSwaps()

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getBrokerDealerSwaps({ page, offset, search: isAddress(searchValue) || searchValue === '' ? searchValue : '' })
  }

  useEffect(() => {
    getBrokerDealerSwaps({ page: 1, offset })
  }, [getBrokerDealerSwaps])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)

    if (isAddress(value) || value === '') {
      clearTimeout(timer)
      timer = setTimeout(() => getBrokerDealerSwaps({ page: 1, offset, search: value }), 250)
    }
  }

  return (
    <>
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {items?.length === 0 ? (
        <NoData>
          <Trans>No data</Trans>
        </NoData>
      ) : (
        <Container>
          <SearchInput value={searchValue} placeholder={t`Search for Wallet`} onChange={onSearchChange} />
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

const NoData = styled.div`
  font-weight: 600;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
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

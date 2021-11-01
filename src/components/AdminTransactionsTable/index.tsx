import { t, Trans } from '@lingui/macro'
import { LoaderThin } from 'components/Loader/LoaderThin'
import dayjs from 'dayjs'
import styled from 'styled-components'
import React, { useEffect } from 'react'

import { useAdminState, useFetchBrokerDealerSwaps } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { BodyRow, HeaderRow, Table } from '../Table'
import { Pagination } from 'components/AdminKycTable/Pagination'
import { usePairContract } from 'hooks/useContract'

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

const Body = () => {
  const {
    brokerDealerSwaps: { items },
  } = useAdminState()

  return (
    <>
      {items?.map(
        ({ id, data: { amount }, user: { ethAddress }, brokerDealer: { name: broker }, status, token, createdAt }) => {
          return (
            <StyledBodyRow key={`transaction-${id}`}>
              <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
              <div>{broker}</div>
              <Wallet>{shortenAddress(ethAddress || '')}</Wallet>
              <div>{`ETH > ${token?.symbol}`}</div>
              <div>{`${amount} ${token?.symbol}`}</div>
              <div style={{ textTransform: 'capitalize' }}>{status}</div>
              <div>{status === 'approved' || status === 'created' ? 'OK' : 'NOT OK'}</div>
            </StyledBodyRow>
          )
        }
      )}
    </>
  )
}

export const AdminTransactionsTable = () => {
  const {
    brokerDealerSwaps: { items, page, totalPages, offset },
    adminLoading,
  } = useAdminState()
  const getBrokerDealerSwaps = useFetchBrokerDealerSwaps()

  const onPageChange = (page: number) => {
    getBrokerDealerSwaps({ page, offset })
  }

  console.log('ya', items)

  useEffect(() => {
    getBrokerDealerSwaps({ page: 1, offset })
  }, [getBrokerDealerSwaps, offset])

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
          <Table body={<Body />} header={<Header />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </Container>
      )}
    </>
  )
}

const Loader = styled.div`
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
  grid-template-columns: repeat(7, 1fr);
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: repeat(7, 1fr);
  min-width: 1270px;
`

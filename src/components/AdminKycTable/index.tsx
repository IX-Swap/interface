import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { Table, BodyRow, HeaderRow } from '../Table'
import { FirstStepStatus } from './FirstStepStatus'
import { SecondStepStatus } from './SecondStepStatus'
import { Pagination } from './Pagination'
import { MoreActions } from './MoreActions'
import { useAdminState, useGetKycList } from 'state/admin/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { shortenAddress } from 'utils'

const headerCells = [
  t`Wallet address`,
  t`Token`,
  t`Date of request`,
  t`Accreditation pair`,
  t`Step 1 - Primary issuer`,
  t`Step 2 - Custodian`,
]

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
    kycList: { items },
  } = useAdminState()
  return (
    <>
      {items?.map(
        ({
          id,
          user: { ethAddress },
          custodian: { name: custodian },
          brokerDealer: { name: broker },
          status,
          token,
          createdAt,
          kyc: { url },
        }) => (
          <StyledBodyRow key={id}>
            <Wallet>{shortenAddress(ethAddress || '')}</Wallet>
            <div>{token?.symbol || '-'}</div>
            <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
            <div>
              {broker} - {custodian}
            </div>
            <div>
              <FirstStepStatus status={status} link={url} />
            </div>
            <div>
              <SecondStepStatus status={status} id={id} />
            </div>
            <div>
              <MoreActions id={id} />
            </div>
          </StyledBodyRow>
        )
      )}
    </>
  )
}

export const AdminKycTable = () => {
  const {
    kycList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getKycList = useGetKycList()

  const onPageChange = (page: number) => {
    getKycList({ page, offset: 10 })
  }

  useEffect(() => {
    getKycList({ page: 1, offset: 10 })
  }, [])

  return (
    <>
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {items.length === 0 ? (
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
  grid-template-columns: 175px 75px 175px 200px calc((100% - 675px) / 2) calc((100% - 675px) / 2) 50px;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 175px 75px 175px 200px calc((100% - 675px) / 2) calc((100% - 675px) / 2) 50px;
  min-width: 1270px;
`

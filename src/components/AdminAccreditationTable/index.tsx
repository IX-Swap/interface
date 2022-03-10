import React, { FC, useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { StyledCopy } from 'components/AdminTransactionsTable'
import { LoaderThin } from 'components/Loader/LoaderThin'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useAdminState, useGetAccreditationList } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { AccreditationItem } from 'state/admin/actions'

import { SecondStepStatus } from './SecondStepStatus'
import { BodyRow, HeaderRow, Table } from '../Table'
import { FirstStepStatus } from './FirstStepStatus'
import { MoreActions } from './MoreActions'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { Pagination } from './Pagination'
import { Search } from './Search'

const headerCells = [
  t`Wallet address`,
  t`Token`,
  t`Date of request`,
  t`Accreditation pair`,
  t`Step 1 - Primary issuer`,
  t`Step 2 - Custodian`,
]

interface RowProps {
  item: AccreditationItem
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

const Row: FC<RowProps> = ({ item }: RowProps) => {
  const [copied, setCopied] = useCopyClipboard()
  const {
    id,
    user: { ethAddress },
    custodian: { name: custodian },
    brokerDealer: { name: broker },
    status,
    token,
    createdAt,
    userId,
    kyc,
    userKyc,
  } = item

  return (
    <StyledBodyRow key={id}>
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
      <div>{token?.symbol || '-'}</div>
      <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div>
        {broker} - {custodian}
      </div>
      <div>
        <FirstStepStatus status={status} kyc={kyc} userKyc={userKyc} broker={broker} userId={userId} />
      </div>
      <div>
        <SecondStepStatus status={status} id={id} />
      </div>
      <div>
        <MoreActions id={id} />
      </div>
    </StyledBodyRow>
  )
}

const Body = () => {
  const {
    accreditationList: { items },
  } = useAdminState()
  return (
    <>
      {items?.map((item) => {
        return <Row key={`kyc-table-${item.id}`} item={item} />
      })}
    </>
  )
}

export const AdminAccreditationTable = () => {
  const {
    accreditationList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getAccreditationList = useGetAccreditationList()

  const onPageChange = (page: number) => {
    getAccreditationList({ page, offset: 10 })
  }

  useEffect(() => {
    getAccreditationList({ page: 1, offset: 10 })
  }, [getAccreditationList])

  return (
    <>
      <Search />
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

export default AdminAccreditationTable

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

export const Container = styled.div`
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

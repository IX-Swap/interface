import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { StyledCopy } from 'components/AdminTransactionsTable'
import { LoaderThin } from 'components/Loader/LoaderThin'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { getKyc, useAdminState, useGetAccreditationList } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { AccreditationItem, KycItem } from 'state/admin/actions'

import { CustodianStatus } from './CustodianStatus'
import { BodyRow, HeaderRow, Table } from '../Table'
import { BrokerDealerStatus } from './BrokerDealerStatus'
import { MoreActions } from './MoreActions'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { Pagination } from './Pagination'
import { Search } from './Search'
import { KycSource } from './KycSource'
import { KycReviewModal } from 'components/KycReviewModal'

const headerCells = [
  t`Wallet address`,
  t`Token`,
  t`Date of request`,
  t`KYC source`,
  t`Broker-Dealer status`,
  t`Custodian status`,
]

interface RowProps {
  item: AccreditationItem
  openReviewModal: (kyc: KycItem) => void
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

const Row: FC<RowProps> = ({ item, openReviewModal }: RowProps) => {
  const [copied, setCopied] = useCopyClipboard()
  const {
    id,
    user,
    custodian: { name: custodian },
    brokerDealer: { name: broker },
    status,
    token,
    createdAt,
    kyc,
    userKyc,
  } = item
  const { ethAddress } = user

  const onKycClick = () => {
    openReviewModal({ ...((userKyc || {}) as KycItem), user })
  }

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
        <KycSource onKycClick={onKycClick} kyc={kyc} userKyc={userKyc} status={status} />
      </div>
      <div>
        <BrokerDealerStatus status={status} kyc={kyc} broker={broker} />
      </div>
      <div>
        <CustodianStatus status={status} id={id} custodian={custodian} />
      </div>
    </StyledBodyRow>
  )
}

interface BodyProps {
  openReviewModal: (kyc: KycItem) => void
}

const Body = ({ openReviewModal }: BodyProps) => {
  const {
    accreditationList: { items },
  } = useAdminState()

  return (
    <>
      {items?.map((item) => {
        return <Row key={`kyc-table-${item.id}`} item={item} openReviewModal={openReviewModal} />
      })}
    </>
  )
}

export const AdminAccreditationTable = () => {
  const [kyc, handleKyc] = useState({} as KycItem)
  const {
    accreditationList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getAccreditationList = useGetAccreditationList()

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getAccreditationList({ page, offset: 10 })
  }

  useEffect(() => {
    getAccreditationList({ page: 1, offset: 10 })
  }, [getAccreditationList])

  const closeModal = () => handleKyc({} as KycItem)
  const openModal = (kyc: KycItem) => handleKyc(kyc)

  return (
    <div id="accreditation-container">
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
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
          <Table body={<Body openReviewModal={openModal} />} header={<Header />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </Container>
      )}
    </div>
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
  grid-template-columns: 1fr 100px repeat(3, 1fr) minmax(250px, 1fr);
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 100px repeat(3, 1fr) minmax(250px, 1fr);
  min-width: 1270px;
`

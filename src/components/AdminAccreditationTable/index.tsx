import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { LoaderThin } from 'components/Loader/LoaderThin'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useAdminState, useGetAccreditationList, useOnlyAdminAccess } from 'state/admin/hooks'
import { AccreditationItem, KycItem } from 'state/admin/actions'
import { adminOffset as offset } from 'state/admin/constants'
import { CopyAddress } from 'components/CopyAddress'

import { CustodianStatus } from './CustodianStatus'
import { BodyRow, HeaderRow, Table } from '../Table'
import { BrokerDealerStatus } from './BrokerDealerStatus'
import { Pagination } from './Pagination'
import { Search } from './Search'
import { KycSource } from './KycSource'
import { KycReviewModal } from 'components/KycReviewModal'
import { NoData } from 'components/Whitelist/styleds'

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
  searchValue: string
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

const Row: FC<RowProps> = ({ item, searchValue, openReviewModal }: RowProps) => {
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
    custodianStatus,
    brokerDealerStatus,
  } = item
  const { ethAddress } = user

  const onKycClick = () => {
    openReviewModal({ ...((userKyc || {}) as KycItem), user })
  }

  return (
    <StyledBodyRow key={id}>
      <Wallet>
        <CopyAddress address={ethAddress} copied={copied} setCopied={setCopied} />
      </Wallet>
      <div>{token?.symbol || '-'}</div>
      <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div>
        <KycSource onKycClick={onKycClick} kyc={kyc} userKyc={userKyc} status={status} />
      </div>
      <div>
        <BrokerDealerStatus status={brokerDealerStatus} kyc={kyc} broker={broker} />
      </div>
      <div>
        <CustodianStatus status={custodianStatus} searchValue={searchValue} id={id} custodian={custodian} />
      </div>
    </StyledBodyRow>
  )
}

interface BodyProps {
  searchValue: string
  openReviewModal: (kyc: KycItem) => void
}

const Body = ({ searchValue, openReviewModal }: BodyProps) => {
  const {
    accreditationList: { items },
  } = useAdminState()

  return (
    <>
      {items?.map((item) => {
        return (
          <Row key={`kyc-table-${item.id}`} searchValue={searchValue} item={item} openReviewModal={openReviewModal} />
        )
      })}
    </>
  )
}

export const AdminAccreditationTable = () => {
  useOnlyAdminAccess()
  const [kyc, handleKyc] = useState({} as KycItem)
  const [searchValue, setSearchValue] = useState('')
  const {
    accreditationList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getAccreditationList = useGetAccreditationList()

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getAccreditationList({ page, offset, search: searchValue })
  }

  useEffect(() => {
    getAccreditationList({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }, [getAccreditationList, searchValue])

  const closeModal = () => handleKyc({} as KycItem)
  const openModal = (kyc: KycItem) => handleKyc(kyc)

  return (
    <div id="accreditation-container">
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
      <Search setSearchValue={setSearchValue} />
      {adminLoading && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {items.length === 0 ? (
        <NoData>
          <Trans>No results</Trans>
        </NoData>
      ) : (
        <Container>
          <Table body={<Body searchValue={searchValue} openReviewModal={openModal} />} header={<Header />} />
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

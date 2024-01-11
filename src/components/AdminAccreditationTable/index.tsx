import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { LoaderThin } from 'components/Loader/LoaderThin'
import { useAdminState, useGetAccreditationList, useOnlyAdminAccess } from 'state/admin/hooks'
import { AccreditationItem, KycItem } from 'state/admin/actions'
import { adminOffset as offset } from 'state/admin/constants'
import { CopyAddress } from 'components/CopyAddress'
import { Search } from 'components/Search'
import { KycReviewModal } from 'components/KycReviewModal'
import { NoData } from 'components/UsersList/styleds'

import { CustodianStatus } from './CustodianStatus'
import { BodyRow, HeaderRow, Table } from '../Table'
import { BrokerDealerStatus } from './BrokerDealerStatus'
import { Pagination } from './Pagination'
import { KycSource } from './KycSource'
import { TYPE } from 'theme'
import { isMobile } from 'react-device-detect'

const headerCells = [
  `Token`,
  `Wallet address`,
  `Country`,
  `Date of request`,
  `Investor Status`,
  `KYC source`,
  `Broker-Dealer status`,
  `Custodian status`,
]

const statusLegend = {
  individualAccredited: 'AI',
  individualNotAccredited: 'Non-AI',
  corporateAccredited: 'AI/C',
  corporateNotAccredited: 'Non-AI/C',
} as Record<string, string>

interface RowProps {
  item: AccreditationItem
  openReviewModal: (kyc: KycItem) => void
  searchValue: string
}

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div key={cell}>
          <Trans>{cell}</Trans>
        </div>
      ))}
    </StyledHeaderRow>
  )
}

const Row: FC<RowProps> = ({ item, searchValue, openReviewModal }: RowProps) => {
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

  const investorType = `${userKyc?.individualKycId ? 'individual' : 'corporate'}${
    userKyc?.individual?.accredited || userKyc?.corporate?.accredited ? '' : 'Not'
  }Accredited`

  return (
    <StyledBodyRow key={id}>
      <div style={{ fontWeight: 700, fontSize: '12px' }}>{token?.symbol || '-'}</div>
      <Wallet style={{fontSize: '12px'}}>
        <CopyAddress  address={ethAddress} />
      </Wallet>
      <div style={{fontSize: '12px'}}>{userKyc?.individual?.address?.country || userKyc?.corporate?.countryOfIncorporation || '-'}</div>
      <div style={{fontSize: '12px'}}>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>

      <div style={{fontSize: '12px'}}>{statusLegend[investorType] || '-'}</div>
      <div>
        <KycSource onKycClick={onKycClick} kyc={kyc} userKyc={userKyc} status={status} />
      </div>
      <div>
        <BrokerDealerStatus  status={brokerDealerStatus} kyc={kyc} broker={broker} />
      </div>
      <div>
        <CustodianStatus  status={custodianStatus} searchValue={searchValue} id={id} custodian={custodian} />
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
    <>
    <div  style={{ margin: isMobile ? '30px 0px 0px 40px'  : '30px 80px 0px 40px' }} id="accreditation-container">
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
      <TYPE.title4 fontSize={'29px'} marginBottom="30px" data-testid="securityTokensTitle">
        <Trans>Accreditation</Trans>
      </TYPE.title4>
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

const Wallet = styled.div`
  color: #b8b8cc;
  // background: ${({ theme: { bgG3 } }) => bgG3};
  // -webkit-background-clip: text;
  // background-clip: text;
  // -webkit-text-fill-color: transparent;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 10px;
  // padding: 0px 40px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 0.6fr 200px 0.8fr 170px repeat(3, 1fr) minmax(218px, 1fr);
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 0.6fr 200px 0.8fr 170px repeat(3, 1fr) minmax(217px, 0.8fr);
  min-width: 1266px;
`

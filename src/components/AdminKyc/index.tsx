import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { StyledCopy } from 'components/AdminTransactionsTable'
import { LoaderThin } from 'components/Loader/LoaderThin'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useAdminState, useGetKycList } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { KycItem } from 'state/admin/actions'
import { IconWrapper } from 'components/AccountDetails/styleds'

import { Pagination } from '../Pagination'
import { BodyRow, HeaderRow, Table } from '../Table'
import { Search } from '../AdminAccreditationTable/Search'
import { StatusCell } from './StatusCell'
import { MoreMenu } from './MoreMenu'
import { KycReviewModal } from 'components/KycReviewModal'

const headerCells = [t`Wallet address`, t`Name`, t`Identity`, t`Date of request`, t`KYC Status`, t`Risk level`]

interface RowProps {
  item: KycItem
  openModal: () => void
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

const Row: FC<RowProps> = ({ item, openModal }: RowProps) => {
  const [copied, setCopied] = useCopyClipboard()
  const {
    id,
    user: { ethAddress },
    status,
    createdAt,
    individualKycId,
  } = item

  const kyc = individualKycId ? item.individual : item.corporate

  const fullName = [kyc?.firstName, kyc?.lastName].filter((el) => Boolean(el)).join(' ')

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
      <div>{fullName || '-'}</div>
      <div>{t`${individualKycId ? 'Individual' : 'Corporate'}`}</div>
      <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div>
        <StatusCell status={status} />
      </div>
      <div>risk level</div>
      <div>
        <MoreMenu openModal={openModal} />
      </div>
    </StyledBodyRow>
  )
}

const Body = ({ openModal }: { openModal: (kyc: KycItem) => void }) => {
  const {
    kycList: { items },
  } = useAdminState()
  return (
    <>
      {items?.map((item) => {
        return <Row key={`kyc-table-${item.id}`} item={item} openModal={() => openModal(item)} />
      })}
    </>
  )
}

interface AdminKycTableProps {
  openKyc: number | undefined
}

export const AdminKycTable = (props: AdminKycTableProps) => {
  const [kyc, handleKyc] = useState({} as KycItem)
  const {
    kycList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getKycList = useGetKycList()

  const onPageChange = (page: number) => {
    getKycList({ page, offset: 10 })
  }

  const closeModal = () => handleKyc({} as KycItem)
  const openModal = (kyc: KycItem) => handleKyc(kyc)

  useEffect(() => {
    if (props.openKyc && items.length > 0) {
      const kyc = items.find((i) => i.userId === props.openKyc)

      if (kyc) {
        openModal(kyc)
      }
    }
  }, [items, props.openKyc])

  useEffect(() => {
    getKycList({ page: 1, offset: 10 })
  }, [getKycList])

  return (
    <>
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
      <Search placeholder="Search for Wallet" />
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
          <Table body={<Body openModal={openModal} />} header={<Header />} />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </Container>
      )}
    </>
  )
}

export default AdminKycTable

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
  grid-template-columns: 175px 175px 175px repeat(3, calc((100% - 575px) / 3)) 50px;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 175px 175px 175px repeat(3, calc((100% - 575px) / 3)) 50px;
  min-width: 1270px;
`

import React, { FC, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { StyledCopy } from 'components/AdminTransactionsTable'
import { LoaderThin } from 'components/Loader/LoaderThin'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { getKycById, useAdminState, useGetKycList } from 'state/admin/hooks'
import { shortenAddress } from 'utils'
import { KycItem } from 'state/admin/actions'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { adminOffset as offset } from 'state/admin/constants'

import { Pagination } from '../Pagination'
import { BodyRow, HeaderRow, Table } from '../Table'
import { Search } from '../AdminAccreditationTable/Search'
import { StatusCell } from './StatusCell'
import { KycReviewModal } from 'components/KycReviewModal'
import { ButtonGradientBorder } from 'components/Button'
import { useHistory, useParams } from 'react-router-dom'
import { AdminParams } from 'pages/Admin'

const headerCells = [t`Wallet address`, t`Name`, t`Identity`, t`Date of request`, t`KYC Status`]

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
  const fullName = individualKycId
    ? [kyc?.firstName, kyc?.lastName].filter((el) => Boolean(el)).join(' ')
    : kyc?.corporateName

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
      {/* <div>risk level</div> */}
      <div>
        <StyledReviewButton onClick={openModal}>Review</StyledReviewButton>
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

export const AdminKycTable = () => {
  const [kyc, handleKyc] = useState({} as KycItem)
  const [isLoading, handleIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const {
    kycList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getKycList = useGetKycList()

  const history = useHistory()

  const { id } = useParams<AdminParams>()

  useEffect(() => {
    getKycList({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }, [getKycList, searchValue])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getKycList({ page, offset, search: searchValue })
  }

  const closeModal = () => {
    history.push(`/admin/kyc`)
    handleKyc({} as KycItem)
  }
  const openModal = (kyc: KycItem) => history.push(`/admin/kyc/${kyc.id}`)

  useEffect(() => {
    getKyc()
  }, [id])

  const getKyc = async () => {
    if (!id) return
    try {
      handleIsLoading(true)
      const data = await getKycById(id)
      handleKyc(data)
      handleIsLoading(false)
    } catch (e) {
      handleIsLoading(false)
    }
  }

  return (
    <div id="kyc-container">
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
      <Search placeholder="Search for Wallet" setSearchValue={setSearchValue} />
      {(adminLoading || isLoading) && (
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
    </div>
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
  grid-template-columns: 175px 175px 175px 1fr 1fr 100px;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 175px 175px 175px 1fr 1fr 100px;
  min-width: 1270px;
`

const StyledReviewButton = styled(ButtonGradientBorder)`
  min-height: 32px;
  padding: 4px 8px;
  font-size: 14px;
`

/* eslint-disable prefer-const */
import React, { FC, useCallback, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'

import { File } from 'react-feather'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { getKycById, useAdminState, useGetKycList } from 'state/admin/hooks'
import { CopyAddress } from 'components/CopyAddress'
import { KycItem } from 'state/admin/actions'
import { AdminKycFilters, TStats } from 'components/AdminKycFilters'
import { adminOffset as offset } from 'state/admin/constants'

import { Pagination } from '../Pagination'
import { BodyRow, HeaderRow, Table } from '../Table'
import { StatusCell } from './StatusCell'
import { KycReviewModal } from 'components/KycReviewModal'
import { ButtonGradientBorder } from 'components/Button'
import { AdminParams } from 'pages/Admin'
import { NoData } from 'components/UsersList/styleds'
import { getStatusStats } from 'state/kyc/hooks'
import { TYPE } from 'theme'
import { Line } from 'components/Line'

const headerCells = [t`Wallet address`, t`Name`, t`Identity`, t`Date of request`, t`KYC Status`]
interface RowProps {
  item: KycItem
  openModal: () => void
}

const Header = () => {
  return (
    <>
      <StyledHeaderRow>
        {headerCells.map((cell) => (
          <div key={cell}>{cell}</div>
        ))}
      </StyledHeaderRow>
      <Line style={{ marginBottom: '20px' }} />
    </>
  )
}

const Row: FC<RowProps> = ({ item, openModal }: RowProps) => {
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
        <CopyAddress address={ethAddress} />
      </Wallet>
      <div>{fullName || '-'}</div>
      <div>{t`${individualKycId ? 'Individual' : 'Corporate'}`}</div>
      <div>{dayjs(createdAt).format('MMM D, YYYY HH:mm')}</div>
      <div>
        <StatusCell status={status} />
      </div>
      {/* <div>risk level</div> */}
      <TYPE.main2 style={{ cursor: 'pointer' }} color="#6666FF" onClick={openModal}>
        Review
      </TYPE.main2>
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
  const [identity, setIdentity] = useState<any>(null)
  const [kyc, handleKyc] = useState({} as KycItem)
  const [isLoading, handleIsLoading] = useState(false)
  const [stats, setStats] = useState<TStats[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['total'])
  const [endDate, setEndDate] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const {
    kycList: { totalPages, page, items },
    adminLoading,
  } = useAdminState()
  const getKycList = useGetKycList()

  const history = useHistory()

  const { id } = useParams<AdminParams>()

  const getKycFilters = (page: number, withStatus = true) => {
    let kycFilter: any = {
      page,
      offset,
      search: searchValue,
      identity: identity?.label ? identity.label.toLowerCase() : 'all',
    }
    if (!selectedStatuses.includes('total') && withStatus && selectedStatuses.length > 0) {
      kycFilter.status = selectedStatuses.join(',')
    }
    if (endDate) {
      kycFilter.date = (endDate as any).format('YYYY-MM-DD')
    }

    return kycFilter
  }

  useEffect(() => {
    const getStats = async () => {
      const data = await getStatusStats(getKycFilters(1, false))
      if (data?.stats) setStats([...data.stats, { status: 'total', count: data.total }])
    }

    getStats()
  }, [searchValue, identity, selectedStatuses, endDate])

  useEffect(() => {
    getKycList(getKycFilters(1))
  }, [getKycList, searchValue, identity, selectedStatuses, endDate])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getKycList(getKycFilters(page))
  }

  const onIdentityChange = (identity: any) => {
    setIdentity(identity)
  }

  const closeModal = () => {
    history.push(`/admin/kyc`)
    handleKyc({} as KycItem)
  }
  const openModal = (kyc: KycItem) => history.push(`/admin/kyc/${kyc.id}`)

  const getKyc = useCallback(async () => {
    if (!id) return
    try {
      handleIsLoading(true)
      const data = await getKycById(id)
      handleKyc(data)
      handleIsLoading(false)
    } catch (e) {
      handleIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getKyc()
  }, [id, getKyc])

  return (
    <div style={{ marginTop: '30px' }} id="kyc-container">
      {Boolean(kyc.id) && <KycReviewModal isOpen onClose={closeModal} data={kyc} />}
      <TYPE.title4 marginBottom="30px" data-testid="securityTokensTitle">
        <Trans>KYC</Trans>
      </TYPE.title4>
      <AdminKycFilters
        stats={stats}
        setSearchValue={setSearchValue}
        identity={identity}
        onIdentityChange={onIdentityChange}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {(adminLoading || isLoading) && (
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

export const Wallet = styled.div`
  color: #b8b8cc;
  // background: ${({ theme: { bgG3 } }) => bgG3};
  // -webkit-background-clip: text;
  // background-clip: text;
  // -webkit-text-fill-color: transparent;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

export const StyledDoc = styled(File)`
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 100px;
  min-width: 1270px;
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 100px;
  min-width: 1270px;
`

const StyledReviewButton = styled(ButtonGradientBorder)`
  min-height: 32px;
  padding: 4px 8px;
  font-size: 14px;
`

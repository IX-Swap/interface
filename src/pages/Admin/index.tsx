import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'
import { AdminAccreditationTable } from 'components/AdminAccreditationTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { AdminSecurityCatalog } from 'components/AdminSecurityCatalog'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianToggleWrapper } from 'pages/Custodian/styleds'
import { Border, ToggleOption } from 'components/Tabs'
import { AdminKycTable } from 'components/AdminKyc'

import { Navbar } from './Navbar'

type AdminTab = 'accreditation' | 'kyc' | 'transactions' | 'security-catalog'

interface Tab {
  label: string
  value: AdminTab
}

const tabs: Tab[] = [
  { label: 'Accreditation', value: 'accreditation' },
  { label: 'KYC', value: 'kyc' },
  { label: 'Broker-dealer Transactions', value: 'transactions' },
  { label: 'Security catalog', value: 'security-catalog' },
]

const renderTab = (selectedTab: AdminTab | string, openKyc?: number) => {
  switch (selectedTab) {
    case 'kyc':
      return <AdminKycTable openKyc={openKyc} />
    case 'accreditation':
      return <AdminAccreditationTable />
    case 'transactions':
      return <AdminTransactionsTable />
    case 'security-catalog':
      return <AdminSecurityCatalog />

    default:
      return null
  }
}

const AdminKyc = () => {
  const [selectedTab, setSelectedTab] = useState<AdminTab>('kyc')
  const [openKyc, setOpenKyc] = useState<number | undefined>(undefined)

  const history = useHistory()
  const location = useLocation()

  const { adminData } = useAdminState()
  const getMe = useGetMe()

  const fetchMe = useCallback(async () => {
    const result = await getMe()

    if (result && result?.role === 'admin') {
      // history.push('/admin')
    } else {
      history.push('/')
    }
  }, [getMe, history])

  const changeTab = useCallback(
    (tab: AdminTab) => {
      const params = new URLSearchParams(location.search.slice(1))

      params.set('tab', tab)

      history.push({ search: params.toString() })
      setSelectedTab(tab)
    },
    [history, location]
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search.slice(1))
    const tab = (params.get('tab') ?? 'kyc') as AdminTab

    const userId = params.get('kycUserId')

    setSelectedTab(tab)

    if (tab === 'kyc' && userId) {
      setOpenKyc(Number(userId))
    }
  }, [location])

  useEffect(() => {
    if (!adminData) {
      fetchMe()
      return
    }

    if (adminData && adminData?.role === 'admin') {
      // history.push('/admin')
      return
    }

    history.push('/')
  }, [getMe, adminData, history, fetchMe])

  return (
    <Container>
      <Navbar />
      {adminData?.role === 'admin' && (
        <Body>
          <ColumnCenter style={{ marginBottom: '24px' }}>
            <AutoColumn style={{ paddingBottom: 0 }}>
              <CustodianToggleWrapper>
                {tabs.map(({ value, label }, index) => (
                  <>
                    <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={selectedTab === value}>
                      <Trans>{label}</Trans>
                      <Border active={selectedTab === value} />
                    </ToggleOption>
                  </>
                ))}
              </CustodianToggleWrapper>
            </AutoColumn>
          </ColumnCenter>

          {renderTab(selectedTab, openKyc)}
        </Body>
      )}
    </Container>
  )
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  padding: 0 30px;
  max-width: 1610px;
  margin: 0 auto;
  width: 100%;
`

export default AdminKyc

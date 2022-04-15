import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'
import { AdminAccreditationTable } from 'components/AdminAccreditationTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { AdminSecurityCatalog } from 'components/AdminSecurityCatalog'
import { Border, ToggleOption } from 'components/Tabs'
import { AdminList } from 'components/AdminList'
import { AdminKycTable } from 'components/AdminKyc'

import { Navbar } from './Navbar'
import { SUPPORTED_ADMIN_ROLES } from './mock'

type AdminTab = 'accreditation' | 'kyc' | 'transactions' | 'security-catalog' | 'admin-list'

interface Tab {
  label: string
  value: AdminTab
}

export interface AdminParams {
  tab: AdminTab
  id?: string
}

const tabs: Tab[] = [
  { label: 'Accreditation', value: 'accreditation' },
  { label: 'KYC', value: 'kyc' },
  { label: 'Broker-dealer Transactions', value: 'transactions' },
  { label: 'Security catalog', value: 'security-catalog' },
  { label: `Admin's`, value: 'admin-list' },
]

const renderTab = (selectedTab: AdminTab | string) => {
  switch (selectedTab) {
    case 'kyc':
      return <AdminKycTable />
    case 'accreditation':
      return <AdminAccreditationTable />
    case 'transactions':
      return <AdminTransactionsTable />
    case 'security-catalog':
      return <AdminSecurityCatalog />
    case 'admin-list':
      return <AdminList />
    default:
      return null
  }
}

const AdminKyc = () => {
  const [selectedTab, setSelectedTab] = useState<AdminTab>('kyc')

  const history = useHistory()
  const location = useLocation()
  const params = useParams<AdminParams>()

  const { adminData } = useAdminState()
  const getMe = useGetMe()

  const fetchMe = useCallback(async () => {
    const result = await getMe()

    if (result && result?.role === 'admin') {
      // history.push('/admin')
    } else if (result && result?.role === 'operator') {
      history.push('/admin/kyc')
    } else {
      history.push('/')
    }
  }, [getMe, history])

  const changeTab = useCallback(
    (tab: AdminTab) => {
      history.push(`/admin/${tab}`)
    },
    [history, location]
  )

  useEffect(() => {
    const tab = params.tab

    setSelectedTab(tab)
  }, [params])

  useEffect(() => {
    if (!adminData) {
      fetchMe()
      return
    }

    if (adminData && SUPPORTED_ADMIN_ROLES.includes(adminData.role || 'user')) {
      // history.push('/admin')
      return
    }

    history.push('/')
  }, [getMe, adminData, history, fetchMe])

  return (
    <Container>
      <Navbar />
      {SUPPORTED_ADMIN_ROLES.includes(adminData?.role || 'user') && (
        <Body>
          <TabsContainer>
            {tabs.map(({ value, label }, index) => (
              <>
                <ToggleOption
                  style={
                    adminData?.role === 'operator' && value !== 'kyc' ? { opacity: 0.5, pointerEvents: 'none' } : {}
                  }
                  key={`tabs-${index}`}
                  onClick={() => changeTab(value)}
                  active={selectedTab === value}
                >
                  <Trans>{label}</Trans>
                  <Border active={selectedTab === value} />
                </ToggleOption>
              </>
            ))}
          </TabsContainer>

          {renderTab(selectedTab)}
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
  max-width: 1330px;
  margin: 0 auto;
  width: 100%;
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`

export default AdminKyc

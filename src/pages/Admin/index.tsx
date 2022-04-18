import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'
import { AdminAccreditationTable } from 'components/AdminAccreditationTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { AdminSecurityCatalog } from 'components/AdminSecurityCatalog'
import { Border, ToggleOption } from 'components/Tabs'
import { AdminKycTable } from 'components/AdminKyc'
import { AddAdmin } from 'components/AddAdmin'

import { Navbar } from './Navbar'

type AdminTab = 'accreditation' | 'kyc' | 'transactions' | 'security-catalog'

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
    console.log('adminData', adminData)
    if (!adminData) {
      fetchMe()
      return
    }

    if (adminData && adminData?.role === 'admin') {
      // history.push('/admin')
      return
    }

    history.push('/')
  }, [adminData])



  return (
    <Container>
      <Navbar />
      {adminData?.role === 'admin' && (
        <Body>
          <TabsContainer>
            {tabs.map(({ value, label }, index) => (
              <>
                <ToggleOption key={`tabs-${index}`} onClick={() => changeTab(value)} active={selectedTab === value}>
                  <Trans>{label}</Trans>
                  <Border active={selectedTab === value} />
                </ToggleOption>
              </>
            ))}
            <AddAdmin />
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

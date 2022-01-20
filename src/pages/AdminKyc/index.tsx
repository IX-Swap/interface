import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'
import { AdminKycTable } from 'components/AdminKycTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { AdminSecurityCatalog } from 'components/AdminSecurityCatalog'
import { Navbar } from './Navbar'
import { Search } from './Search'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianToggleWrapper } from 'pages/Custodian/styleds'
import { Border, ToggleOption } from 'components/Tabs'
interface Tab {
  label: string
  value: 'kyc' | 'transactions' | 'security-catalog'
}

const tabs: Tab[] = [
  { label: 'KYC', value: 'kyc' },
  { label: 'Broker-dealer Transactions', value: 'transactions' },
  { label: 'Security catalog', value: 'security-catalog' },
]

const AdminKyc = () => {
  const [selectedTab, setSelectedTab] = useState<'kyc' | 'transactions' | 'security-catalog'>('security-catalog')
  const history = useHistory()
  const { adminData, adminError, adminLoading } = useAdminState()
  const getMe = useGetMe()

  const fetchMe = useCallback(async () => {
    const result = await getMe()

    if (result && result?.role === 'admin') {
      history.push('/admin')
    } else {
      history.push('/')
    }
  }, [getMe, history])

  useEffect(() => {
    if (!adminData) {
      fetchMe()
      return
    }

    if (adminData && adminData?.role === 'admin') {
      history.push('/admin')
      return
    }

    history.push('/')
  }, [getMe, adminData, history, fetchMe])

  const renderTab = () => {
    switch (selectedTab) {
      case 'kyc':
        return (
          <>
            <Search />
            <AdminKycTable />
          </>
        )
      case 'transactions':
        return <AdminTransactionsTable />
      case 'security-catalog':
        return <AdminSecurityCatalog />
    }
  }

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
                    <ToggleOption
                      key={`tabs-${index}`}
                      onClick={() => setSelectedTab(value)}
                      active={selectedTab === value}
                    >
                      <Trans>{label}</Trans>
                      <Border active={selectedTab === value} />
                    </ToggleOption>
                  </>
                ))}
              </CustodianToggleWrapper>
            </AutoColumn>
          </ColumnCenter>

          {renderTab()}
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

import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom' // Step 1: Import useLocation
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

import { NotAvailablePage } from 'components/NotAvailablePage'
import { MEDIA_WIDTHS } from 'theme'
import { useUserState, useGetMe } from 'state/user/hooks'
import { AdminAccreditationTable } from 'components/AdminAccreditationTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { AdminSecurityCatalog } from 'components/AdminSecurityCatalog'
import { Border, ToggleOption } from 'components/Tabs'
import { UsersList } from 'components/UsersList'
import { AdminKycTable } from 'components/AdminKyc'

import { Navbar } from './Navbar'
import { SUPPORTED_ADMIN_ROLES } from './mock'

type AdminTab = 'accreditation' | 'kyc' | 'transactions' | 'security-catalog' | 'users-list'

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
  { label: 'Users', value: 'users-list' },
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
    case 'users-list':
      return <UsersList />
    default:
      return null
  }
}

const Admin = () => {
  const { account } = useWeb3React()
  const location = useLocation() // Step 1: Get the current route location

  const [selectedTab, setSelectedTab] = useState<AdminTab>('kyc')

  const history = useHistory()
  const params = useParams<AdminParams>()

  const { me } = useUserState()
  const getMe = useGetMe()

  const isLogged = account && me?.role

  const fetchMe = useCallback(async () => {
    const result = await getMe()

    if (result && result?.role === 'admin') {
      // history.push('/admin');
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
    [history]
  )

  useEffect(() => {
    const tab = params.tab

    setSelectedTab(tab)
  }, [params])

  useEffect(() => {
    if (!me) {
      fetchMe()
      return
    }

    if (me && SUPPORTED_ADMIN_ROLES.includes(me.role || 'user')) {
      // history.push('/admin');
      return
    }

    history.push('/')
  }, [me, fetchMe, history])

  if (!isLogged) {
    return <NotAvailablePage />
  }

  const containerBackground = location.pathname.includes('security-catalog') ? 'none' : '#ffffff'

  return (
    <Container background={containerBackground}>
      <Navbar />
      {SUPPORTED_ADMIN_ROLES.includes(me?.role || 'user') && (
        <Body>
          {/* <TabsContainer>
            {tabs.map(({ value, label }, index) => (
              <>
                <ToggleOption
                  style={me?.role === 'operator' && value !== 'kyc' ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                  key={`tabs-${index}`}
                  onClick={() => changeTab(value)}
                  active={selectedTab === value}
                >
                  <Trans>{label}</Trans>
                  <Border active={selectedTab === value} />
                </ToggleOption>
              </>
            ))}
          </TabsContainer> */}

          {renderTab(selectedTab)}
        </Body>
      )}
    </Container>
  )
}

// Step 2: Modify the styled component to accept background color
export const Container = styled.div<{ background?: string }>`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.background}; // Use the background prop
`

export const Body = styled.div`
  // padding: 0 30px;
  max-width: 1360px;
  margin: 100px auto;
  width: 100%;

  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin: 20px auto;
  }
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  column-gap: 32px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex-direction: column;
    row-gap: 4px;
  }
`

export default Admin

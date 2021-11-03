import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'

import { AdminKycTable } from '../../components/AdminKycTable'
import { AdminTransactionsTable } from '../../components/AdminTransactionsTable'
import { Navbar } from './Navbar'
import { Search } from './Search'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianToggleWrapper } from 'pages/Custodian/styleds'
import { Border, ToggleOption } from 'components/Tabs'

export const AdminKyc = () => {
  const [showKYC, setShowKYC] = useState(true)
  const history = useHistory()
  const getMe = useGetMe()
  const { adminIsAuthenticated, adminError } = useAdminState()

  useEffect(() => {
    if (!adminIsAuthenticated && adminError) {
      history.push('/admin-login')
    }
  }, [adminIsAuthenticated, adminError, history])

  useEffect(() => {
    if (localStorage.getItem('adminAccessToken')) {
      getMe()
    }
  }, [getMe])

  return (
    <Container>
      <Navbar />
      {adminIsAuthenticated && (
        <Body>
          <ColumnCenter style={{ marginBottom: '24px' }}>
            <AutoColumn style={{ paddingBottom: 0 }}>
              <CustodianToggleWrapper>
                <ToggleOption onClick={() => setShowKYC(!showKYC)} active={showKYC}>
                  <Trans>KYC</Trans>
                  <Border active={showKYC} />
                </ToggleOption>
                <ToggleOption onClick={() => setShowKYC(!showKYC)} active={!showKYC}>
                  <Trans>Broker-dealer Transactions</Trans>
                  <Border active={!showKYC} />
                </ToggleOption>
              </CustodianToggleWrapper>
            </AutoColumn>
          </ColumnCenter>

          {showKYC ? (
            <>
              <Search />
              <AdminKycTable />
            </>
          ) : (
            <AdminTransactionsTable />
          )}
        </Body>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  padding: 0 30px;
  max-width: 1610px;
  margin: 0 auto;
  width: 100%;
`

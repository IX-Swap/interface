import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useAdminState, useGetMe } from 'state/admin/hooks'
import { AdminKycTable } from 'components/AdminKycTable'
import { AdminTransactionsTable } from 'components/AdminTransactionsTable'
import { Navbar } from './Navbar'
import { Search } from './Search'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { CustodianToggleWrapper } from 'pages/Custodian/styleds'
import { Border, ToggleOption } from 'components/Tabs'

const AdminKyc = () => {
  const [showKYC, setShowKYC] = useState(true)
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

  return (
    <Container>
      <Navbar />
      {adminData?.role === 'admin' && (
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
            <>
              <AdminTransactionsTable />
            </>
          )}
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

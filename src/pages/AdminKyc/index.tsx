import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useAdminState, useGetMe } from 'state/admin/hooks'

import { AdminKycTable } from '../../components/AdminKycTable'
import { Navbar } from './Navbar'
import { Search } from './Search'

export const AdminKyc = () => {
  const history = useHistory()
  const getMe = useGetMe()
  const { adminIsAuthenticated, adminError } = useAdminState()

  useEffect(() => {
    if (!adminIsAuthenticated && adminError) {
      history.push('/admin-login')
    }
  }, [adminIsAuthenticated, adminError, history])

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getMe()
    }
  }, [getMe])

  return (
    <Container>
      <Navbar />
      {adminIsAuthenticated && (
        <Body>
          <Search />
          <AdminKycTable />
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

import React, { useEffect } from 'react'
import AppBody from 'pages/AppBody'
import { AdminLogin } from '../../components/AdminLogin'
import { useAdminState, useGetMe } from 'state/admin/hooks'
import { useHistory } from 'react-router-dom'

export const AdminLoginPage = () => {
  const history = useHistory()
  const getMe = useGetMe()
  const adminIsAuthenticated = useAdminState().adminIsAuthenticated

  useEffect(() => {
    if (adminIsAuthenticated) {
      history.push('/admin-kyc')
    }
  }, [adminIsAuthenticated, history])

  useEffect(() => {
    if (localStorage.getItem('adminAccessToken')) {
      getMe()
    }
  }, [getMe])

  return (
    <AppBody>
      <AdminLogin />
    </AppBody>
  )
}

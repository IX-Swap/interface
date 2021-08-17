import React, { useEffect } from 'react'
import { useAdminState, useGetMe } from 'state/admin/hooks'
import { useHistory } from 'react-router-dom'

export const AdminKycPage = () => {
  const history = useHistory()
  const getMe = useGetMe()
  const { adminIsAuthenticated, adminError } = useAdminState()

  useEffect(() => {
    if (!adminIsAuthenticated && adminError) {
      history.push('/admin-login')
    }
  }, [adminIsAuthenticated, adminError])

  useEffect(() => {
    getMe()
  }, [])

  return <div>KYC table</div>
}

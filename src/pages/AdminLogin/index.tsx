import React, { useEffect } from 'react'
import AppBody from 'pages/AppBody'
import { useAdminState, useGetMe } from 'state/admin/hooks'
import { useHistory } from 'react-router-dom'

export const AdminLoginPage = () => {
  const history = useHistory()
  const getMe = useGetMe()
  const { adminData } = useAdminState()

  useEffect(() => {
    if (adminData?.role === 'admin') {
      history.push('/admin-kyc')
    } else {
      history.push('/swap')
    }
  }, [history, adminData])

  useEffect(() => {
    const fetchMe = async () => {
      await getMe()
    }

    fetchMe()
  }, [getMe])

  return (
    <AppBody>
      <></>
    </AppBody>
  )
}

import React, { useEffect } from 'react'
import { useAuthRouter } from 'auth/router'
import { useVerifySignup } from 'auth/hooks/useVerifySignup'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'

export const Confirmation: React.FC = () => {
  const { query, push, replace } = useAuthRouter()
  const [verifySignup, { isSuccess, isError, isIdle }] = useVerifySignup()

  useEffect(() => {
    const token = query.get('token')

    if (token !== null) {
      // eslint-disable-next-line no-void
      void verifySignup({ verificationToken: token })
      replace('confirm')
    }

    if ((token === null && isIdle) || isSuccess || isError) {
      replace('login')
    }
  }, [query, verifySignup, push]) // eslint-disable-line

  return <LoadingFullScreen />
}

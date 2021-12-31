import React, { useEffect } from 'react'
import { useVerifySignup } from 'auth/hooks/useVerifySignup'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { useHistory } from 'react-router-dom'
import { useSearchQuery } from 'hooks/useSearchQuery'
import { AuthRoute } from 'auth/router/config'

export const Confirmation: React.FC = () => {
  const { push, replace } = useHistory()
  const query = useSearchQuery()
  const [verifySignup, { isSuccess, isError, isIdle }] = useVerifySignup()

  useEffect(() => {
    const token = query.get('token')

    if (token !== null) {
      // eslint-disable-next-line no-void
      void verifySignup({ verificationToken: token })
      replace(AuthRoute.confirm)
    }

    if ((token === null && isIdle) || isSuccess || isError) {
      replace(AuthRoute.login)
    }
  }, [query, verifySignup, push]) // eslint-disable-line

  return <LoadingFullScreen />
}

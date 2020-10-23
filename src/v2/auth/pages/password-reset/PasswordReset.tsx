import React, { useEffect } from 'react'
import { RequestStep } from 'v2/auth/pages/password-reset/RequestStep'
import { ResetStep } from 'v2/auth/pages/password-reset/ResetStep'
import {
  PasswordResetProvider,
  usePasswordResetStore
} from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { observer } from 'mobx-react'
import { useAuthRouter } from 'v2/auth/router'

export const PasswordReset: React.FC = observer(() => {
  const { currentStep, setToken } = usePasswordResetStore()
  const { query } = useAuthRouter()
  let element

  useEffect(() => {
    const token = query.get('token')

    if (token !== null) {
      setToken(token)
    }
  }, []) //eslint-disable-line

  switch (currentStep) {
    case PasswordResetStep.Request:
      element = <RequestStep />
      break
    case PasswordResetStep.Reset:
      element = <ResetStep />
      break
    default:
      return null
  }

  return <PasswordResetProvider>{element}</PasswordResetProvider>
})

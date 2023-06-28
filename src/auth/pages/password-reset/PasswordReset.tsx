import React, { useEffect } from 'react'
import { RequestStep } from 'auth/pages/password-reset/RequestStep'
import { ResetStep } from 'auth/pages/password-reset/ResetStep'
import {
  PasswordResetProvider,
  usePasswordResetStore
} from 'auth/context/password-reset'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { observer } from 'mobx-react'
import { useSearchQuery } from 'hooks/useSearchQuery'
import { useTenant } from 'auth/hooks/useTenant'

export const PasswordReset: React.FC = observer(() => {
  const { currentStep, setToken } = usePasswordResetStore()

  useTenant()
  const query = useSearchQuery()
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

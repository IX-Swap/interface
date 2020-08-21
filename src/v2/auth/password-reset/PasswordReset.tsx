import React from 'react'
import { RequestStep } from 'v2/auth/password-reset/RequestStep'
import { ResetStep } from 'v2/auth/password-reset/ResetStep'
import { ConfirmationStep } from 'v2/auth/password-reset/ConfirmationStep'
import {
  PasswordResetProvider,
  usePasswordResetStore
} from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { observer } from 'mobx-react'

export const PasswordReset: React.FC = observer(() => {
  const { currentStep, error, message } = usePasswordResetStore()
  let element

  switch (currentStep) {
    case PasswordResetStep.Request:
      element = <RequestStep />
      break
    case PasswordResetStep.Reset:
      element = <ResetStep />
      break
    case PasswordResetStep.Confirmation:
      element = <ConfirmationStep />
      break
    default:
      return null
  }

  return (
    <PasswordResetProvider>
      <div>{error ?? error}</div>
      <div>{message ?? message}</div>
      {element}
    </PasswordResetProvider>
  )
})

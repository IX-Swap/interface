import React from 'react'
import { RequestStep } from 'v2/auth/pages/password-reset/RequestStep'
import { ResetStep } from 'v2/auth/pages/password-reset/ResetStep'
import { ConfirmationStep } from 'v2/auth/pages/password-reset/ConfirmationStep'
import {
  PasswordResetProvider,
  usePasswordResetStore
} from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { observer } from 'mobx-react'

export const PasswordReset: React.FC = observer(() => {
  const { currentStep } = usePasswordResetStore()
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

  return <PasswordResetProvider>{element}</PasswordResetProvider>
})

import React from 'react'
import RequestStep from 'v2/Auth/PasswordReset/RequestStep'
import ResetStep from 'v2/Auth/PasswordReset/ResetStep'
import ConfirmationStep from 'v2/Auth/PasswordReset/ConfirmationStep'
import {
  PasswordResetProvider,
  usePasswordResetStore
} from 'v2/Auth/context/password-reset'
import { PasswordResetStep } from 'v2/Auth/context/password-reset/types'
import { observer } from 'mobx-react'

const PasswordReset: React.FC = () => {
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
}

export default observer(PasswordReset)

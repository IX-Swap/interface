import React from 'react'
import { ReactComponent as Enabled2FAIcon } from 'assets/icons/2fa/security-enabled.svg'
import { ReactComponent as Disabled2FAIcon } from 'assets/icons/2fa/security-disabled.svg'
import { useAuth } from 'hooks/auth/useAuth'

export const TwoFAIcon = () => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user

  if (enable2Fa === true) {
    return <Enabled2FAIcon />
  }

  return <Disabled2FAIcon />
}

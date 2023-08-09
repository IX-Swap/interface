import React from 'react'
import { ReactComponent as EnableIcon } from 'assets/images/dashboard/account-actions/enable-2fa.svg'
import { ReactComponent as UpdateIcon } from 'assets/images/dashboard/account-actions/update-2fa.svg'
import { ActionItem } from './ActionItem'
import { SecurityRoute } from 'app/pages/security/router/config'

export const TwoFactorAuthentication = ({
  hasEnabled = false
}: {
  hasEnabled: boolean
}) => {
  const title = !hasEnabled ? 'Enable 2FA' : 'Update 2FA'
  const description = !hasEnabled
    ? 'Protect your account with Two-Factor Authentication.'
    : 'Keep your account protected by updating Two-Factor Authentication.'
  const buttonText = !hasEnabled ? 'Enable 2FA' : 'Update 2FA'
  const buttonLink = !hasEnabled
    ? SecurityRoute.setup2fa
    : SecurityRoute.change2fa

  return (
    <ActionItem
      icon={!hasEnabled ? <EnableIcon /> : <UpdateIcon />}
      title={title}
      description={description}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  )
}

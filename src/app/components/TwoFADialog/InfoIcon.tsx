import React from 'react'
import { ReactComponent as Enabled2FAIcon } from 'assets/icons/2fa/security-enabled.svg'
import { ReactComponent as Disabled2FAIcon } from 'assets/icons/2fa/security-disabled.svg'

export interface InfoIconProps {
  enable2Fa: boolean | undefined
}

export const InfoIcon = ({ enable2Fa }: InfoIconProps) => {
  if (enable2Fa === true) {
    return <Enabled2FAIcon />
  }

  return <Disabled2FAIcon />
}

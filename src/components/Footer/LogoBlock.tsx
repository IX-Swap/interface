import React from 'react'
import { Trans } from '@lingui/macro'

import { AppLogo } from 'components/AppLogo'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { LogoBlockContainer } from './styleds'

export const LogoBlock = () => {
  const { config } = useWhitelabelState()

  return (
    <LogoBlockContainer>
      <AppLogo withText height="49px" width="auto" />
      <Trans>
        {config?.footerConfig?.block1 ||
          `IX Swap is built by a global team of capital markets, legal and blockchain experts, bringing you the next
        generation of trading for Security tokens and tokenized stocks`}
      </Trans>
    </LogoBlockContainer>
  )
}

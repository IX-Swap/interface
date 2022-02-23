import React from 'react'
import { Trans } from '@lingui/macro'

import logoImg from 'assets/svg/logo_white.svg'

import { LogoBlockContainer } from './styleds'

export const LogoBlock = () => {
  return (
    <LogoBlockContainer>
      <img src={logoImg} alt="logoImg" height="49px" width="auto" />
      <Trans>
        IX Swap is built by a global team of capital markets, legal and blockchain experts, bringing you the next
        generation of trading for Security tokens and tokenized stocks
      </Trans>
    </LogoBlockContainer>
  )
}

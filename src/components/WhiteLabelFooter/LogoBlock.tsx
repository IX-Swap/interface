import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { AppLogo } from 'components/AppLogo'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { LogoBlockContainer } from './styleds'

export const LogoBlock = () => {
  const { config } = useWhitelabelState()

  return (
    <LogoBlockContainer>
      <AppLogo withText height="49px" width="auto" />

      <DescText>
        <Trans>
          {config?.footerConfig?.block1 ||
            `IX Swap is built by a global team of capital markets, legal and blockchain experts, bringing you the next
        generation of trading for Security tokens and tokenized stocks`}
        </Trans>
      </DescText>
    </LogoBlockContainer>
  )
}

const DescText = styled.div`
  font-style: normal;
  letter-spacing: -0.02em;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: rgb(184, 184, 204);
`

import React from 'react'
import { Trans, t } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { useWhitelabelState } from 'state/whitelabel/hooks'

import { CopyrightBlockContainer } from './styleds'

export const CopyrightBlock = () => {
  const year = dayjs().format('YYYY')
  const { config } = useWhitelabelState()

  return (
    <CopyrightBlockContainer>
      <div>
        <TermText
          href={config?.footerConfig?.termsLink || 'https://ixswap.io/terms-and-conditions/'}
          target="_blank"
          rel="noreferrer"
        >
          <Trans>Terms & Conditions</Trans>
        </TermText>
        <TermText
          href={config?.footerConfig?.privacyLink || 'https://ixswap.io/privacy-policy/'}
          target="_blank"
          rel="noreferrer"
        >
          <Trans>Privacy Policy</Trans>
        </TermText>
      </div>
      <CopyrightText>
        <Trans>{`Copyright © ${config?.name || 'IX Swap'} ${year}`}</Trans>
      </CopyrightText>
    </CopyrightBlockContainer>
  )
}

const TermText = styled.a`
  font-style: normal;
  letter-spacing: -0.02em;
  font-weight: 500;
  line-height: 140%;
  font-size: 12px;
  color: rgb(184, 184, 204);
  margin-bottom: 15px;
`

const CopyrightText = styled.div`
  rid-area: copyright;
  place-self: start;
  font-style: normal;
  letter-spacing: -0.02em;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: rgb(41, 41, 51);
`

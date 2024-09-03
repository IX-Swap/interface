import React from 'react'
import { Trans, t } from '@lingui/macro'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Flex } from 'rebass'

import { useWhitelabelState } from 'state/whitelabel/hooks'

export const CopyrightBlock = () => {
  const year = dayjs().format('YYYY')
  const { config } = useWhitelabelState()

  return (
    <Flex flexDirection="column" mb={120} mt={16}>
      <CopyrightText>
        <Trans>{`Copyright © IX Swap ${year}`}</Trans>
      </CopyrightText>
      <Flex alignItems="center">
        <TermText
          href={config?.termsAndConditionsUrl || 'https://ixswap.io/terms-and-conditions/'}
          target="_blank"
          rel="noreferrer"
        >
          <Trans>Terms & Conditions</Trans>
        </TermText>
        <Dot />
        <TermText
          href={config?.privacyPolicyUrl || 'https://ixswap.io/privacy-policy/'}
          target="_blank"
          rel="noreferrer"
        >
          <Trans>Privacy Policy</Trans>
        </TermText>
      </Flex>
    </Flex>
  )
}

const TermText = styled.a`
  font-style: normal;
  letter-spacing: -0.24px;
  font-weight: 500;
  line-height: 140%;
  font-size: 12px;
  color: #b8b8cc;
  text-decoration: none;
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
  margin-bottom: 8px;
`

const Dot = styled.div`
  height: 3px;
  width: 3px;
  background-color: #b8b8cc;
  border-radius: 50%;
  display: inline-block;
  margin-left: 16px;
  margin-right: 16px;
`

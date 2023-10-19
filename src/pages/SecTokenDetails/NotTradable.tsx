import React from 'react'
import { t } from '@lingui/macro'
import { Box } from 'rebass'

import { TYPE } from 'theme'
import { useWhitelabelState } from 'state/whitelabel/hooks'

import { ValutContainer, NotTradableContainer } from './styleds'

interface Props {
  ticker: string
}

export const NotTradable = ({ ticker }: Props) => {
  const { config } = useWhitelabelState()
  return (
    <ValutContainer>
      <NotTradableContainer>
        <TYPE.title6>Not tradable yet</TYPE.title6>
        <Box textAlign="center">{t`${ticker} token is not ready to be traded on ${
          config?.name || 'IX Swap'
        } yet. Please check later.`}</Box>
      </NotTradableContainer>
    </ValutContainer>
  )
}

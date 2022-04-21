import React from 'react'
import { t } from '@lingui/macro'
import { Box } from 'rebass'

import { TYPE } from 'theme'

import { ValutContainer, NotTradableContainer } from './styleds'

interface Props {
  ticker: string
}

export const NotTradable = ({ ticker }: Props) => {
  return (
    <ValutContainer>
      <NotTradableContainer>
        <TYPE.title3>Not tradable yet</TYPE.title3>
        <Box textAlign="center">{t`${ticker} token is not ready to be traded on IX Swap yet. Please check later.`}</Box>
      </NotTradableContainer>
    </ValutContainer>
  )
}

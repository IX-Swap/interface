import React from 'react'
import { TYPE } from '../../theme'
import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'

export const EmptyLiquidity = () => {
  const theme = useTheme()
  return (
    <TYPE.body color={theme.text2} textAlign="center">
      <Trans>No liquidity found.</Trans>
    </TYPE.body>
  )
}

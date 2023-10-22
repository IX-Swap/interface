import React from 'react'
import { TYPE } from '../../theme'
import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'

export const EmptyLiquidity = () => {
  const theme = useTheme()
  return (
    <TYPE.body fontWeight={500} color={'#B8B8CC'} textAlign="center">
      <Trans>No liquidity found.</Trans>
    </TYPE.body>
  )
}

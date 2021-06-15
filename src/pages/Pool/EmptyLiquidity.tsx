import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'

import { Trans } from '@lingui/macro'

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EmptyLiquidity = () => {
  const theme = useContext(ThemeContext)
  return (
    <EmptyProposals>
      <TYPE.body color={theme.text3} textAlign="center">
        <Trans>No liquidity found.</Trans>
      </TYPE.body>
    </EmptyProposals>
  )
}

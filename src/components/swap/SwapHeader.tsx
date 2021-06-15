import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 0;
  width: 100%;
  margin-bottom: 22px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text2};
`

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
            <Trans>Swap</Trans>
          </TYPE.black>
        </RowFixed>
        <RowFixed></RowFixed>
      </RowBetween>
    </StyledSwapHeader>
  )
}

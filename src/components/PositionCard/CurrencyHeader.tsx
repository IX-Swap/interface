import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import DoubleCurrencyLogo from '../DoubleLogo'
import { AutoRow } from '../Row'
import { Dots } from '../swap/styleds'
import { DesktopAndTablet, MobileOnly } from 'theme'

const StyledText = styled(Text)`
  margin-left: 8px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 600;

  ${({ theme }) => theme.mediaWidth.upToExtremelySmall`
    font-size: 16px;
    margin: 4px !important;
    text-overflow: ellipsis;
    overflow: hidden;
  `};
`

export const CurrencyHeader = ({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) => {
  return (
    <AutoRow style={{ flexWrap: 'nowrap' }} gap="13px">
      <DesktopAndTablet>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={33} />
      </DesktopAndTablet>
      <MobileOnly>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
      </MobileOnly>
      <StyledText>
        {!currency0 || !currency1 ? (
          <Dots>
            <Trans>Loading</Trans>
          </Dots>
        ) : (
          `${currency0.symbol}/${currency1.symbol}`
        )}
      </StyledText>
    </AutoRow>
  )
}

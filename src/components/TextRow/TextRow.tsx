import { Currency } from '@ixswap1/sdk-core'
import React from 'react'
import { Text } from 'rebass'
import CurrencyLogo from '../CurrencyLogo'
import { RowFixed } from '../Row'
import { FixedHeightRow } from './styleds'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import styled from 'styled-components/macro'

interface Props {
  textLeft: React.ReactNode
  textRight?: React.ReactNode
  currency?: Currency
  tooltipText?: string
}

const RowTinyColumn = styled(FixedHeightRow)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      flex-wrap: wrap;
  `};
`

export const TextRow = ({ textLeft, textRight, currency, tooltipText }: Props) => {
  return (
    <RowTinyColumn data-testid="tableRow">
      <RowFixed>
        <Text>{textLeft}</Text>
        {tooltipText && (
          <MouseoverTooltip style={{ whiteSpace: 'pre-line' }} text={tooltipText}>
            <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
              <InfoIcon />
            </IconWrapper>
          </MouseoverTooltip>
        )}
      </RowFixed>
      <RowFixed>
        {currency && textRight && <CurrencyLogo size="20px" style={{ marginRight: '8px' }} currency={currency} />}
        <Text>{textRight ?? '-'}</Text>
      </RowFixed>
    </RowTinyColumn>
  )
}

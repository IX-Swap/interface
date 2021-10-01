import { Currency } from '@ixswap1/sdk-core'
import { ReactComponent as InfoIcon } from 'assets/images/info-filled.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { MouseoverTooltip } from 'components/Tooltip'
import React from 'react'
import { Text } from 'rebass'
import CurrencyLogo from '../CurrencyLogo'
import { RowFixed } from '../Row'
import { FixedHeightRow } from './styleds'

interface Props {
  textLeft: React.ReactNode
  textRight?: React.ReactNode
  currency?: Currency
  tooltipText?: string
}

export const TextRow = ({ textLeft, textRight, currency, tooltipText }: Props) => {
  return (
    <FixedHeightRow data-testid="tableRow">
      <RowFixed className="text-row">
        <Text>{textLeft}</Text>
        {tooltipText && (
          <MouseoverTooltip style={{ whiteSpace: 'pre-line' }} text={tooltipText}>
            <IconWrapper size={20} style={{ marginLeft: '12px' }}>
              <InfoIcon />
            </IconWrapper>
          </MouseoverTooltip>
        )}
      </RowFixed>
      <RowFixed>
        {currency && textRight && <CurrencyLogo size="20px" style={{ marginRight: '8px' }} currency={currency} />}
        <Text>{textRight ?? '-'}</Text>
      </RowFixed>
    </FixedHeightRow>
  )
}

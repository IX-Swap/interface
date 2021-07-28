import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { Text } from 'rebass'
import { Currency, Token } from '@ixswap1/sdk-core'
import styled from 'styled-components/macro'

import { COMMON_BASES } from '../../constants/routing'
import { currencyId } from '../../utils/currencyId'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { SemiTransparent, TYPE } from 'theme'
import useTheme from 'hooks/useTheme'
import { useUserSecTokens } from 'state/user/hooks'
import { useSecTokens } from 'state/secTokens/hooks'
import { STO_STATUS_APPROVED, STO_STATUS_CREATED } from 'components/SecurityCard/STOStatus'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border-radius: 40px;
  display: flex;
  padding: 0 6px;
  background: ${({ theme }) => theme.bgG1};
  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    padding: 1px 7px;
  }
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: number
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const theme = useTheme()
  const { secTokens } = useUserSecTokens()
  const visibleTokens = useMemo(() => {
    return Object.keys(secTokens)
      .filter((tokenId) => (secTokens[tokenId] as any).tokenInfo?.tokenUser?.status === STO_STATUS_APPROVED)
      .reduce<{
        [address: string]: Token
      }>((obj, key) => {
        obj[key] = secTokens[key]
        return obj
      }, {})
  }, [secTokens])

  return Object.keys(visibleTokens).length > 0 ? (
    <AutoColumn gap="md">
      <AutoRow>
        <SemiTransparent>
          <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase' }}>
            <Trans>Featured Tokens</Trans>
          </TYPE.title6>
        </SemiTransparent>
      </AutoRow>
      <AutoRow gap="4px">
        {Object.keys(visibleTokens).map((id: string) => {
          const currency = secTokens[id]
          const isSelected = selectedCurrency?.equals(currency)
          return (
            <BaseWrapper
              onClick={() => !isSelected && onSelect(currency)}
              disable={isSelected}
              key={currencyId(currency)}
            >
              <CurrencyLogo currency={currency} style={{ marginRight: 7 }} />
              <TYPE.body4>{currency?.symbol ?? currency?.name}</TYPE.body4>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  ) : null
}

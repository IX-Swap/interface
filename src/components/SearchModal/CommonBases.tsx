import { Currency, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import useTheme from 'hooks/useTheme'
import React, { useMemo } from 'react'
import { useUserSecTokens } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { SemiTransparent, TYPE } from 'theme'
import { currencyId } from '../../utils/currencyId'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import { AutoRow } from '../Row'

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
      .filter(
        (tokenId) =>
          (secTokens[tokenId] as any).tokenInfo?.accreditationRequest?.brokerDealerStatus === AccreditationStatusEnum.APPROVED
          && (secTokens[tokenId] as any).tokenInfo?.accreditationRequest?.custodianStatus === AccreditationStatusEnum.APPROVED
      )
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

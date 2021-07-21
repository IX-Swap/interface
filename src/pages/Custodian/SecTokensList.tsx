import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FixedSizeList } from 'react-window'
import { Box, Text } from 'rebass'
import { routes } from 'utils/routes'
import { ButtonGradient } from '../../components/Button'
import { MenuItem, MenuRow } from './styleds'

function currencyKey(currency: Currency): string {
  return currency.isToken ? currency.address : 'ETHER'
}

function CurrencyRow({ currency, style }: { currency: Currency; style: CSSProperties }) {
  const key = currencyKey(currency)

  // only show add or remove buttons if not on selected list
  return (
    <MenuRow style={style} className={`token-item-${key}`}>
      <MenuItem>
        <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CurrencyLogo currency={currency} size={'33px'} />
          <Column>
            <Text title={currency.name} fontWeight={500}>
              {currency.symbol ?? currency.name}
            </Text>
          </Column>
        </Box>
        <Box width="100%">
          <ButtonGradient as={Link} to={routes.securityTokens(currency)} data-testid="custodian-sec-token-info">
            <Trans>Info</Trans>
          </ButtonGradient>
        </Box>
      </MenuItem>
    </MenuRow>
  )
}

export default function SecTokensList({
  height,
  currencies,
  fixedListRef,
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
}) {
  const itemData: Currency[] = useMemo(() => {
    return currencies
  }, [currencies])

  const Row = useCallback(function TokenRow({ data, index, style }) {
    const row: Currency = data[index]
    const currency = row
    if (currency) {
      return <CurrencyRow style={style} currency={currency} />
    } else {
      return null
    }
  }, [])

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    const currency = data[index]
    return currencyKey(currency)
  }, [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}

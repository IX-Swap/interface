import { Currency } from '@ixswap1/sdk-core'
import SecurityCard from 'components/SecurityCard'
import { useWindowSize } from 'hooks/useWindowSize'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import { MEDIA_WIDTHS } from 'theme'

function currencyKey(currency: Currency): string {
  return currency.isToken ? currency.address : 'ETHER'
}

function CurrencyRow({ currency, style }: { currency: Currency; style: CSSProperties }) {
  const key = currencyKey(currency)
  // only show add or remove buttons if not on selected list
  return <SecurityCard key={key} currency={currency} style={style} />
}

export default function SecTokensList({
  height,
  currencies,
  listRef,
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  otherCurrency?: Currency | null
  listRef?: MutableRefObject<List | undefined>
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
  const { width = 0 } = useWindowSize()
  const itemHeight = width < MEDIA_WIDTHS.upToExtraSmall ? 100 : 80

  return (
    <List
      height={height}
      ref={listRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={itemHeight}
      itemKey={itemKey}
    >
      {Row}
    </List>
  )
}

import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import SecurityCard from 'components/SecurityCard'
import { useWindowSize } from 'hooks/useWindowSize'
import { FixedSizeList as List } from 'react-window'
import { MEDIA_WIDTHS } from 'theme'

function currencyKey(currency: Currency): string {
  return currency.isToken ? currency.address : 'ETHER'
}

function CurrencyRow({ currency, style, isAll }: { currency: Currency; style: CSSProperties; isAll: boolean }) {
  const key = currencyKey(currency)
  // only show add or remove buttons if not on selected list
  return <SecurityCard key={key} currency={currency} style={style} isAll={isAll} />
}

export default function SecTokensList({
  currencies,
  listRef,
  isAll = false,
}: {
  height?: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  otherCurrency?: Currency | null
  listRef?: MutableRefObject<List | undefined>
  isAll?: boolean
}) {
  const itemData: Currency[] = useMemo(() => {
    return currencies
  }, [currencies])

  const Row = useCallback(
    function TokenRow({ data, index, style }) {
      const row: Currency = data[index]
      const currency = row
      if (currency) {
        return <CurrencyRow style={style} currency={currency} isAll={isAll} />
      } else {
        return null
      }
    },
    [isAll]
  )

  const itemKey = useCallback((index: number, data: typeof itemData) => {
    const currency = data[index]
    return currencyKey(currency)
  }, [])
  const { width = 0 } = useWindowSize()
  const itemHeight = width < MEDIA_WIDTHS.upToExtraSmall ? 85 : 80

  return (
    <List
      height={itemData.length > 5 ? itemHeight * 5 : itemHeight * itemData.length}
      ref={listRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={itemHeight}
      itemKey={itemKey}
      style={{ overflowY: 'scroll' }}
    >
      {Row}
    </List>
  )
}

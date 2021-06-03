import React from 'react'
import { findSymbolById, isMarketDataFalsy, isPairIdFalsy } from '../utils'

export const useSymbol = (pairId: string, data: any) => {
  const [symbol, setSymbol] = React.useState<string>('')
  const shouldRenderSymbol = !isPairIdFalsy(pairId) && !isMarketDataFalsy(data)
  React.useEffect(() => {
    if (shouldRenderSymbol) {
      const symbol = findSymbolById(pairId, data?.list)
      setSymbol(symbol)
    }
  }, [pairId, data, shouldRenderSymbol])
  return { symbol }
}

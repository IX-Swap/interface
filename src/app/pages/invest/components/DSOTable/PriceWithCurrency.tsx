import React from 'react'

export interface PriceWithCurrencyProps {
  price: string
  currency: string
}

export const replaceZeros = (price: string) => {
  if (typeof parseInt(price) !== 'number') return null
  const priceNum = parseInt(price)
  if (priceNum < 1000) return +priceNum.toFixed(2)
  if (priceNum < 1000000) return `${+(priceNum / 1000).toFixed(2)}K`
  if (priceNum >= 1000000) return `${+(priceNum / 1000000).toFixed(2)}M`
}

export const PriceWithCurrency: React.FC<PriceWithCurrencyProps> = ({
  price,
  currency
}: PriceWithCurrencyProps) => {
  return (
    <span
      style={{
        whiteSpace: 'nowrap',
        textAlign: 'right',
        width: '100%',
        fontWeight: 'bold'
      }}
    >
      {currency} {replaceZeros(price)}
    </span>
  )
}

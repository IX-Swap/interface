import { Typography } from '@mui/material'
import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'
import { ExchangeMarket } from 'types/listing'
import { productTypes } from 'components/form/ProductTypeSelect'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface DisplayMarketProps {
  assetId: string
}

export const DisplayMarket = ({ assetId }: DisplayMarketProps) => {
  const { data, isLoading } = useAssetById(assetId)
  if (data === undefined || isLoading) {
    return null
  }

  return <Typography>{`${data.name} (${data.symbol})`}</Typography>
}

export interface TradingPairsProps {
  markets: ExchangeMarket[]
}

export const TradingPairs = ({ markets }: TradingPairsProps) => {
  return (
    <>
      {markets.map(market => (
        <DisplayMarket key={market._id} assetId={market.quote} />
      ))}
    </>
  )
}

export interface MarketOverviewProps {
  availableMarket: string
  markets: ExchangeMarket[]
  productType: string
}

export const MarketOverview = ({
  availableMarket,
  markets,
  productType
}: MarketOverviewProps) => {
  const productTypeObj = productTypes.find(v => v.value === productType)
  const stoProductType =
    typeof productTypeObj !== 'undefined' ? productTypeObj?.label : productType

  const items = [
    {
      label: 'Available Trading Pairs',
      value: <TradingPairs markets={markets} />
    },
    {
      label: 'Available Market',
      value: availableMarket
    },
    {
      label: 'Product Type',
      value: stoProductType
    }
  ]

  return <FieldGrid title={'Market'} items={items} />
}

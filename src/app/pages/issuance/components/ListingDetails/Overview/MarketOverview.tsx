import { Grid, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'
import { ExchangeMarket } from 'types/listing'

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
}

export const MarketOverview = ({
  availableMarket,
  markets
}: MarketOverviewProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Market' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Available Trading Pairs'
          value={<TradingPairs markets={markets} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Available Market' value={availableMarket} />
      </Grid>
    </Grid>
  )
}

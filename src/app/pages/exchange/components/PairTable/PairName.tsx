import { Grid, IconButton } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { useFavoritePairs } from 'app/pages/exchange/hooks/useFavoritePairs'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import { useMarkPairAsFavorite } from 'app/pages/exchange/hooks/useMarkPairAsFavorite'
import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import { generatePath } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface PairNameProps {
  pair: Pair
}

export const PairName = ({ pair }: PairNameProps) => {
  const { markAsFavorite } = useMarkPairAsFavorite()
  const { data: favoritePairs } = useFavoritePairs()

  const handleClick = () => {
    markAsFavorite(pair._id)
  }

  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item>
        <IconButton size='small' onClick={handleClick}>
          {favoritePairs?.includes(pair._id) ?? false ? (
            <Star style={{ color: '#F0D400' }} />
          ) : (
            <StarBorder />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <AppRouterLink
          to={generatePath(InvestRoute.exchange, { pairId: pair._id })}
        >
          {pair.name}
        </AppRouterLink>
      </Grid>
    </Grid>
  )
}

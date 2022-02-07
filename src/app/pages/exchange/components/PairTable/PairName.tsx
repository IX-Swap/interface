import { Grid, IconButton } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { useFavoritePairs } from 'app/pages/exchange/hooks/useFavoritePairs'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import { useMarkPairAsFavorite } from 'app/pages/exchange/hooks/useMarkPairAsFavorite'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import { generatePath } from 'react-router-dom'

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
          to={generatePath(OTCMarketRoute.market, { pairId: pair._id })}
        >
          {pair.name}
        </AppRouterLink>
      </Grid>
    </Grid>
  )
}

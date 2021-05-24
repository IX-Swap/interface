import { Grid, IconButton } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import { Pair } from 'app/pages/exchange/market/hooks/useMarketList'
import React from 'react'

export interface PairNameProps {
  pair: Pair
}

export const PairName = ({ pair }: PairNameProps) => {
  return (
    <Grid container spacing={1} alignItems='center'>
      <Grid item>
        <IconButton size='small'>
          {pair.isFavorite ? (
            <Star style={{ color: '#F0D400' }} />
          ) : (
            <StarBorder />
          )}
        </IconButton>
      </Grid>
      <Grid item>{pair.name}</Grid>
    </Grid>
  )
}

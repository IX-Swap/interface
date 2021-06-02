import { Grid, IconButton } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import { Pair } from 'app/pages/exchange/hooks/useMarketList'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import { generatePath } from 'react-router'

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

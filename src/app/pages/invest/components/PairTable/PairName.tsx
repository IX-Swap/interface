import { Grid, IconButton } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { useFavoritePairs } from 'app/pages/invest/hooks/useFavoritePairs'
import { Pair } from 'app/pages/invest/hooks/useMarketList'
import { useMarkPairAsFavorite } from 'app/pages/invest/hooks/useMarkPairAsFavorite'
import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { useStyles } from './PairTable.styles'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useServices } from 'hooks/useServices'

export interface PairNameProps {
  pair: Pair
}

export const PairName = ({ pair }: PairNameProps) => {
  const { markAsFavorite } = useMarkPairAsFavorite()
  const { snackbarService } = useServices()
  const { data: favoritePairs } = useFavoritePairs()
  const { wrapper } = useStyles({})
  const { location } = useHistory()

  const handleClick = () => {
    markAsFavorite(pair._id)
  }
  const handleClickError = () => {
    void snackbarService.showSnackbar('This token is not yet deployed')
  }

  return (
    <Grid className={wrapper} container spacing={1} alignItems='center'>
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
        {location?.pathname?.includes('trading') ? (
          <div onClick={handleClickError}>
            <AppRouterLink
              to={''}
              // to={generatePath(InvestRoute.trading, { pairId: pair._id })}
            >
              {pair.name}
            </AppRouterLink>
          </div>
        ) : (
          <AppRouterLink
            to={generatePath(InvestRoute.exchange, { pairId: pair._id })}
          >
            {pair.name}
          </AppRouterLink>
        )}
      </Grid>
    </Grid>
  )
}

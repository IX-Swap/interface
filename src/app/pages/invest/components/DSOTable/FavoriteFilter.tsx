import React from 'react'
import useStyles from 'app/pages/invest/components/DSOCard/DSOCardFavorite.style'
import { Icon } from 'ui/Icons/Icon'
import { IconButton, Typography } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const FavoriteFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const { isTablet } = useAppBreakpoints()
  const value = getFilterValue('isFavorite')
  const classes = useStyles({ isFav: value === 'yes' })

  const handleChange = () => {
    updateFilter(
      'isFavorite',
      value === 'no' || value === undefined ? 'yes' : 'no'
    )
  }

  return (
    <IconButton
      onClick={handleChange}
      data-testid='icon-button'
      className={classes.iconButton}
      size='medium'
      style={{ height: 48, width: isTablet ? '100%' : 48 }}
    >
      <>
        {value === 'yes' ? (
          <Icon
            name='star-filled'
            className={classes.icon}
            style={{ fill: '#ffffff' }}
          />
        ) : (
          <Icon name='star' className={classes.icon} />
        )}
        {isTablet ? (
          <Typography
            color={value === 'yes' ? '#FFF' : '#778194'}
            variant='subtitle1'
            sx={{ ml: 1.5 }}
          >
            Show favourites only
          </Typography>
        ) : null}
      </>
    </IconButton>
  )
}

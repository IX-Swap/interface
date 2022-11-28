import React from 'react'
import useStyles from 'app/pages/invest/components/DSOCard/DSOCardFavorite.style'
import { Icon } from 'ui/Icons/Icon'
import { IconButton, Typography } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

 interface FiltersFavProps {
  setPage?: (page: number)=>void
}

export const FavoriteFilter = (props:FiltersFavProps) => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const { isTablet } = useAppBreakpoints()
  const value = getFilterValue('isFavorite')
  const classes = useStyles({ isFav: value === 'true' })

  const handleChange = () => {
    props.setPage && props.setPage(0);
    const isFavorite = value === 'true' ? 'false' : 'true'
    updateFilter('isFavorite', isFavorite)
    if (isFavorite === 'true') {
      localStorage.setItem('isFavorite', isFavorite)
    } else {
      localStorage.removeItem('isFavorite')
    }
  }

  return (
    <IconButton
      onClick={handleChange}
      data-testid='icon-button'
      className={classes.iconButton}
      size='medium'
      style={{
        height: 48,
        width: isTablet ? 'calc(100% - 8px)' : 48
      }}
    >
      <>
        {value === 'true' ? (
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
            color={value === 'true' ? '#FFF' : '#778194'}
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



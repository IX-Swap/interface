import { CircularProgress, Grid, IconButton } from '@mui/material'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'
import React, { useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './DSOCardFavorite.style'

export interface DSOCardFavoriteProps {
  dso: DigitalSecurityOffering
  dependentQueryKeys: string[]
  refetch: () => void
}

export const DSOCardFavorite = (props: DSOCardFavoriteProps) => {
  const isFav = props.dso.isStarred
  const [toggleDSOFavorite, { isLoading }] = useToggleDSOFavorite(
    props.dso,
    props.dependentQueryKeys
  )
  const [toggleFav, setToggleFav] = useState(isFav)
  const classes = useStyles({ isFav: toggleFav })

  const handleFav = async () => {
    !toggleFav ? setToggleFav(true) : setToggleFav(false)
    const a = await toggleDSOFavorite(toggleFav)
    props.refetch()
    console.log(a)
  }

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      width={56}
      height={36}
    >
      <Grid item>
        {isLoading ? (
          <CircularProgress
            className={classes.progress}
            thickness={5.5}
            size={16}
          />
        ) : (
          <IconButton
            onClick={handleFav}
            data-testid='icon-button'
            className={`${classes.iconButton}`}
            size={'medium'}
          >
            {toggleFav ? (
              <Icon
                name={'star-filled'}
                className={classes.icon}
                style={{ fill: '#ffffff' }}
              />
            ) : (
              <Icon name={'star'} className={classes.icon} />
            )}
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

import { CircularProgress, Grid, IconButton } from '@mui/material'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'
import React, { useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './DSOCardFavorite.style'

export interface DSOCardFavoriteProps {
  dso: DigitalSecurityOffering
  dependentQueryKeys: string[]
}

export const DSOCardFavorite = (props: DSOCardFavoriteProps) => {
  const isFav = props.dso.isStarred
  const classes = useStyles({ isFav })
  const [toggleDSOFavorite, { isLoading }] = useToggleDSOFavorite(
    props.dso,
    props.dependentQueryKeys
  )
  const [toogleFav, setToggleFav] = useState(isFav)

  const handleFav = async () => {
    !toogleFav ? setToggleFav(true) : setToggleFav(false)
    await toggleDSOFavorite(toogleFav)
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
          <>
            {toogleFav ? (
              <IconButton
                onClick={handleFav}
                data-testid='icon-button'
                className={`${classes.iconButton} ${classes.iconButtonActive}`}
                size={'medium'}
              >
                <Icon
                  name={'star-filled'}
                  className={classes.icon}
                  style={{ fill: '#ffffff' }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleFav}
                data-testid='icon-button'
                className={`${classes.iconButton} ${classes.iconButtonNormal}`}
                size={'medium'}
              >
                <Icon name={'star'} className={classes.icon} />
              </IconButton>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

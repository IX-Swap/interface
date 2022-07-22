import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { CircularProgress, Grid, IconButton } from '@mui/material'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'
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

  const handleFav = async () => {
    await toggleDSOFavorite(isFav)
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
            className={classes.iconButton}
            size={'medium'}
          >
            {isFav ? (
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

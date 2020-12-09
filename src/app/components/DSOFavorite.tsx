import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { IconButton, Box, CircularProgress } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'

export interface DSOFavoriteProps {
  dso: DigitalSecurityOffering
}

export const DSOFavorite = (props: DSOFavoriteProps) => {
  const isFav = props.dso.isStarred
  const [toggleDSOFavorite, { isLoading }] = useToggleDSOFavorite(props.dso)

  const handleFav = async () => {
    await toggleDSOFavorite(isFav)
  }

  if (isLoading) {
    return (
      <Box pl={3} style={{ width: 25, height: 25 }}>
        <CircularProgress thickness={5.5} size={16} />
      </Box>
    )
  }

  return (
    <Box pl={3}>
      <IconButton
        size='small'
        onClick={handleFav}
        style={{ color: isFav ? '#F0D400' : '#000000' }}
      >
        {isFav ? (
          <StarIcon color='inherit' />
        ) : (
          <StarBorderOutlinedIcon color='action' />
        )}
      </IconButton>
    </Box>
  )
}

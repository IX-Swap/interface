import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { IconButton } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'

export interface DSOFavoriteProps {
  dso: DigitalSecurityOffering
}

export const DSOFavorite = (props: DSOFavoriteProps) => {
  const isFav = props.dso.favorite
  const [toggleDSOFavorite] = useToggleDSOFavorite(props.dso)

  const handleFav = async () => {
    await toggleDSOFavorite(isFav)
  }

  return (
    <>
      <IconButton
        size='small'
        onClick={handleFav}
        style={{ fontSize: '18px', color: isFav ? '#F0D400' : '#000000' }}
      >
        {isFav ? (
          <StarIcon fontSize='inherit' color='inherit' />
        ) : (
          <StarBorderOutlinedIcon fontSize='inherit' color='action' />
        )}
      </IconButton>
    </>
  )
}

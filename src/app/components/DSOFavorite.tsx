import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { IconButton, CircularProgress, Grid, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { useToggleDSOFavorite } from 'app/pages/invest/hooks/useToggleDSOFavorite'

export interface DSOFavoriteProps {
  dso: DigitalSecurityOffering
  dependentQueryKeys: string[]
}

export const DSOFavorite = (props: DSOFavoriteProps) => {
  const isFav = props.dso.isStarred
  const [toggleDSOFavorite, { isLoading }] = useToggleDSOFavorite(
    props.dso,
    props.dependentQueryKeys
  )

  const handleFav = async () => {
    await toggleDSOFavorite(isFav)
  }

  return (
    <Box pl={1} mr={-1}>
      <Grid container justifyContent='center' alignItems='center'>
        {isLoading ? (
          <CircularProgress thickness={5.5} size={16} />
        ) : (
          <IconButton
            size='small'
            onClick={handleFav}
            style={{ color: isFav ? '#F0D400' : '#000000' }}
            data-testid='icon-button'
          >
            {isFav ? (
              <StarIcon color='inherit' />
            ) : (
              <StarBorderOutlinedIcon color='action' />
            )}
          </IconButton>
        )}
      </Grid>
    </Box>
  )
}

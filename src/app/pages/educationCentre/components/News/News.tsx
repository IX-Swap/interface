import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { NewsList } from 'app/pages/educationCentre/components/News/NewsList'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'
import { useStyles } from './News.style'

export const News = () => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  const theme = useTheme()

  return (
    <>
      <Grid container alignItems={'center'}>
        <Typography variant='h2'>News</Typography>
        <Typography variant='body2' className={classes.text}>
          In Partnership With
        </Typography>
        <img
          width={106}
          height={34}
          src={theme.palette.mode === 'light' ? AtlasLogoDark : AtlasLogoLight}
          alt={'Atlas One Logo'}
        />
        <Grid item xs={12} md={6} lg={3} className={classes.input}>
          <TextInputSearchFilter
            fullWidth
            placeholder='Search'
            inputAdornmentPosition='end'
          />
        </Grid>
      </Grid>
      <Box my={5} />
      <NewsList
        name={homeQueryKeys.getNewsList}
        uri={homeURL.getNewsList}
        filter={filter}
      />
    </>
  )
}
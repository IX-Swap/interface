import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useStyles } from './News.style'
import { useTheme } from '@material-ui/core/styles'
import { NewsList } from 'app/pages/home/components/News/NewsList'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import AtlasLogoLight from 'assets/icons/atlas_logo_white.png'
import AtlasLogoDark from 'assets/icons/atlas_logo.png'

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
        <Typography variant='h4'>News</Typography>
        <Typography variant='body2' className={classes.text}>
          In Partnership With
        </Typography>
        <img
          width={106}
          height={34}
          src={theme.palette.type === 'light' ? AtlasLogoDark : AtlasLogoLight}
          alt={'Atlas One Logo'}
        />
        <Grid item xs={12} md={6} lg={3} className={classes.input}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdormentPosition='end'
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

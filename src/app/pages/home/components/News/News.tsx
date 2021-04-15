import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useStyles } from './News.style'
import { useTheme } from '@material-ui/core/styles'

export const News = () => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }
  console.log(filter)

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
          src={require('assets/icons/atlas_logo.png')}
          alt={'Atlas One Logo'}
          style={{
            filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'initial'
          }}
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
    </>
  )
}

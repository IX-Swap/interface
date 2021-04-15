import React from 'react'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { Grid } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { NewsList } from 'app/pages/home/components/News/NewsList'

export const News = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search')
  }

  return (
    <>
      <Grid container>
        <NewsList
          name={homeQueryKeys.getNewsList}
          uri={homeURL.getNewsList}
          filter={filter}
        />
      </Grid>
    </>
  )
}

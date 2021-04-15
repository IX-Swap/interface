import React from 'react'
import { BaseFilter } from 'types/util'
import { NewsItemType } from 'types/news'
import { useStyles } from './NewsList.style'
import { NewsItem } from 'app/pages/home/components/News/NewsItem'
import { LinearProgress, TablePagination, Grid } from '@material-ui/core'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'

export interface NewsListProps<T> {
  name: string
  uri: string
  queryEnabled?: boolean
  filter?: BaseFilter
}

export const NewsList = <T,>({
  name,
  uri,
  filter,
  queryEnabled = true
}: NewsListProps<T>): JSX.Element => {
  const classes = useStyles()
  const {
    items,
    status,
    page,
    setPage,
    rowsPerPage,
    total
  } = useTableWithPagination<NewsItemType>(name, uri, filter, queryEnabled, 5)

  return (
    <Grid container>
      <Grid item className={classes.wrapper}>
        {status === 'loading' && <LinearProgress />}
        {items.map(({ title, excerpt, imageLink, link, id }) => (
          <NewsItem
            key={id}
            title={title}
            excerpt={excerpt}
            imageLink={imageLink}
            link={link}
          />
        ))}
      </Grid>

      <Grid container justify={'flex-end'}>
        <TablePagination
          count={-1}
          page={page}
          component='div'
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          labelDisplayedRows={() => ''}
          className={classes.pagination}
          nextIconButtonProps={{
            disabled: items.length < rowsPerPage || total === 0
          }}
          onChangePage={(evt, newPage: number) => {
            setPage(newPage)
          }}
        />
      </Grid>
    </Grid>
  )
}

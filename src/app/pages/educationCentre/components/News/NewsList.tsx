import React from 'react'
import { BaseFilter } from 'types/util'
import { NewsItemType } from 'types/news'
import { useStyles } from './NewsList.style'
import { NewsItem } from 'app/pages/educationCentre/components/News/NewsItem'
import { LinearProgress, TablePagination, Grid } from '@material-ui/core'
import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export interface NewsListProps {
  name: string
  uri: string
  queryEnabled?: boolean
  filter?: BaseFilter
}

export const NewsList = ({
  name,
  uri,
  filter,
  queryEnabled = true
}: NewsListProps): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles()
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const { items, status, page, setPage, rowsPerPage, total } =
    useTableWithPagination<NewsItemType>({
      queryKey: name,
      uri: uri,
      defaultFilter: filter,
      queryEnabled: queryEnabled,
      defaultRowsPerPage: 4
    })

  const isSecondaryColor = (index: number) => {
    return isTablet ? index === 1 || index === 3 : index === 1 || index === 2
  }

  return (
    <Grid container>
      <Grid item className={classes.wrapper}>
        {status === 'loading' && <LinearProgress />}
        {items.map(({ title, excerpt, imageLink, link, id }, index) => (
          <Grid item xs={12} md={12} lg={6}>
            <NewsItem
              key={id}
              title={title}
              excerpt={excerpt}
              imageLink={imageLink}
              link={link}
              color={isSecondaryColor(index) ? 'secondary' : 'primary'}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent={'flex-end'}>
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
          onPageChange={(evt, newPage: number) => {
            setPage(newPage)
          }}
        />
      </Grid>
    </Grid>
  )
}

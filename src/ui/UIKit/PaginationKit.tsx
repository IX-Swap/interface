import { Grid, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { Pagination } from 'ui/Pagination/Pagination'
import { TablePagination } from 'ui/Pagination/TablePagination'

export const PaginationKit = () => {
  const [page, setPage] = React.useState(2)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <UIKitThemeWrapper>
      <Grid container spacing={4} flexDirection={'column'}>
        <Grid item>
          <Typography variant={'h3'}>Pagination</Typography>
        </Grid>

        <Grid item>
          <Typography>Basic</Typography>
        </Grid>

        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <Pagination count={13} />
          </Grid>
        </Grid>

        <Grid item>
          <Typography>Tables</Typography>
        </Grid>

        <Grid item container spacing={1} xs={12}>
          <Grid item>
            <TablePagination
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}

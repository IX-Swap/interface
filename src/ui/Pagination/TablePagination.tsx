import {
  Box,
  IconButton,
  TablePagination as MuiTablePagination,
  TablePaginationProps
} from '@mui/material'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'ui/Pagination/Pagination.styles'
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions'

export const PrevIcon = () => <Icon name={'switch-left'} />
export const NextIcon = () => <Icon name={'switch-right'} />

export const Actions = (props: TablePaginationActionsProps) => {
  const classes = useStyles()

  const isPrevButtonDisabled = props.page === 0
  const isNextButtonDisabled =
    props.page * props.rowsPerPage + props.rowsPerPage === props.count

  return (
    <Box display={'flex'} className={classes.actions}>
      <IconButton
        className={classes.item}
        disabled={isPrevButtonDisabled}
        onClick={evt => {
          props.onPageChange(evt, props.page - 1)
        }}
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        className={classes.item}
        disabled={isNextButtonDisabled}
        onClick={evt => {
          props.onPageChange(evt, props.page + 1)
        }}
      >
        <NextIcon />
      </IconButton>
    </Box>
  )
}

export const TablePagination = ({ ...props }: TablePaginationProps) => {
  const classes = useStyles()

  return (
    <MuiTablePagination
      {...props}
      labelRowsPerPage={'Rows:'}
      ActionsComponent={Actions}
      className={classes.wrapper}
      classes={{
        menuItem: classes.menuItem,
        toolbar: classes.toolbar,
        select: classes.select
      }}
      rowsPerPageOptions={[5, 10, 25, 50]}
    />
  )
}

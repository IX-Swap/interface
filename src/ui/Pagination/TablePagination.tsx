import {
  Box,
  IconButton,
  TablePagination as MuiTablePagination,
  TablePaginationProps
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'ui/Pagination/Pagination.styles'
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions'

export const PrevIcon = () => <Icon name={'switch-left'} />
export const NextIcon = () => <Icon name={'switch-right'} />

export const Actions = (props: TablePaginationActionsProps) => {
  const classes = useStyles()
  const [totalPage, setTotalPage] = useState(14)

  const isPrevButtonDisabled = props.page === 0
  const isNextButtonDisabled =
    props.page * props.rowsPerPage + props.rowsPerPage === props.count
  useEffect(() => {
    console.log({ props, isNextButtonDisabled, totalPage })
  }, [isNextButtonDisabled, props, totalPage])
  return (
    <Box display={'flex'} className={classes.actions}>
      <IconButton
        className={classes.item}
        disabled={isPrevButtonDisabled}
        onClick={evt => {
          props.onPageChange(evt, props.page - 1)
          setTotalPage(tp => tp + 10)
        }}
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        className={classes.item}
        disabled={isNextButtonDisabled}
        onClick={evt => {
          setTotalPage(tp => tp - 10)
          props.onPageChange(evt, props.page + 1)
        }}
      >
        <NextIcon />
      </IconButton>
      <p>{totalPage}</p>
    </Box>
  )
}

export const TablePagination = ({ ...props }: TablePaginationProps) => {
  const classes = useStyles()

  return (
    <MuiTablePagination
      {...props}
      labelRowsPerPage={props.labelRowsPerPage ?? 'Rows:'}
      ActionsComponent={Actions}
      className={classes.wrapper}
      // page={props.page}
      classes={{
        menuItem: classes.menuItem,
        toolbar: classes.toolbar,
        select: classes.select
      }}
      rowsPerPageOptions={props.rowsPerPageOptions ?? [5, 10, 25, 50]}
    />
  )
}

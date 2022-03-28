import React from 'react'
import {
  Pagination as MuiPagination,
  PaginationItem,
  PaginationProps as MuiPaginationProps
} from '@mui/material'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from './Pagination.styles'

export interface PaginationProps extends MuiPaginationProps {}

export const PrevButton = () => <Icon name={'switch-left'} />
export const NextButton = () => <Icon name={'switch-right'} />

export const Pagination = ({ ...props }: PaginationProps) => {
  const classes = useStyles()

  return (
    <MuiPagination
      {...props}
      renderItem={item => (
        <PaginationItem
          className={classes.item}
          components={{
            previous: PrevButton,
            next: NextButton
          }}
          {...item}
        />
      )}
    />
  )
}

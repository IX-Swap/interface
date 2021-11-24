import { Typography } from '@material-ui/core'
import React from 'react'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ReportsItem } from 'types/reports'
import { useHistory } from 'react-router-dom'
import { useStyles } from './Actions.styles'

export interface ActionsProps {
  item: ReportsItem
}

export const getPathWithQueryParams = (
  path: string,
  toDate: string | undefined,
  fromDate: string | undefined
) => {
  if (toDate !== undefined && fromDate !== undefined) {
    return `${path}?toDate=${toDate}&fromDate=${fromDate}`
  }
  if (toDate !== undefined) {
    return `${path}?toDate=${toDate}`
  }
  if (fromDate !== undefined) {
    return `${path}?fromDate=${fromDate}`
  }
  return path
}

export const Actions = ({ item }: ActionsProps) => {
  const { href } = item
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')
  const { push } = useHistory()

  return (
    <Typography
      variant={'body1'}
      color={'primary'}
      className={classes.link}
      onClick={() => push(getPathWithQueryParams(href, toDate, fromDate))}
    >
      View Report
    </Typography>
  )
}

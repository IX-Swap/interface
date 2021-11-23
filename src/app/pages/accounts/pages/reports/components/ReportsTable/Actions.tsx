import { Typography } from '@material-ui/core'
import React from 'react'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ReportsItem } from 'types/reports'
import { useHistory } from 'react-router-dom'
import { useStyles } from './Actions.styles'

export interface ActionsProps {
  item: ReportsItem
}

export const Actions = ({ item }: ActionsProps) => {
  const { href } = item
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')
  const { push } = useHistory()

  const getPath = () => {
    if (toDate !== undefined && fromDate !== undefined) {
      return `${href}?toDate=${toDate}&fromDate=${fromDate}`
    }
    if (toDate !== undefined) {
      return `${href}?toDate=${toDate}`
    }
    if (fromDate !== undefined) {
      return `${href}?fromDate=${fromDate}`
    }
    return href
  }

  return (
    <Typography
      variant={'body1'}
      color={'primary'}
      className={classes.link}
      onClick={() => push(getPath())}
    >
      View Report
    </Typography>
  )
}

import React, { ReactElement } from 'react'
import { Grid } from '@mui/material'
import { useStyles } from './ReportsInfo.styles'
import { useGetAccountInfo } from 'app/pages/accounts/hooks/useGetAccountInfo'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { formatDate } from 'helpers/dates'
import { getValueOrPlaceholder } from 'helpers/strings'
import { InfoItem } from '../InfoItem/InfoItem'

export interface ReportsInfoProps {
  children?: ReactElement
}

export const ReportsInfo = ({ children = undefined }: ReportsInfoProps) => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const { data, isLoading } = useGetAccountInfo()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (data === undefined) {
    return null
  }

  const items = [
    ['Name', data.name],
    ['Account Type', data.accountType],
    ['Customer Type', data.customerType],
    ['Date', `${formatDate(fromDate)} - ${formatDate(toDate)}`]
  ]

  const renderAction = () => {
    if (children === undefined) {
      return null
    }

    return (
      <Grid item className={classes.children}>
        {children}
      </Grid>
    )
  }

  return (
    <Grid item container alignItems={'center'} spacing={3}>
      {items.map(([name, value]) => (
        <InfoItem label={name} value={getValueOrPlaceholder(value)} />
      ))}

      {renderAction()}
    </Grid>
  )
}

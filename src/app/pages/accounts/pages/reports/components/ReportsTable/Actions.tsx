import { Button } from '@material-ui/core'
import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { ReportsItem } from 'types/reports'

// TODO Maybe we can use this function
// const getPathWithSearchParams = (path: string, searchParams?: Record<string, any>) => {
//   if (searchParams === undefined) {
//     return path
//   }
//
//   return Object.entries(searchParams).reduce((acc, [key, value], i) => {
//
//     if (key === undefined || value === undefined) {
//       return acc
//     }
//
//     if (acc === path) {
//       return acc.concat(`/?${key}=${value}`)
//     }
//     return acc.concat(`&${key}=${value}`)
//   }, `${path}`)
// }

export interface ActionsProps {
  item: ReportsItem
}

export const Actions = ({ item }: ActionsProps) => {
  const { href } = item
  const { getFilterValue } = useQueryFilter()
  const toDate = getFilterValue('toDate')
  const fromDate = getFilterValue('fromDate')

  const getPath = () => {
    if (toDate !== undefined && fromDate !== undefined) {
      return `${href}/?toDate=${toDate}&fromDate=${fromDate}`
    }
    if (toDate !== undefined) {
      return `${href}/?toDate=${toDate}`
    }
    if (fromDate !== undefined) {
      return `${href}/?fromDate=${fromDate}`
    }
    return href
  }

  return (
    <Button
      variant='text'
      color='primary'
      component={AppRouterLinkComponent}
      to={getPath()}
    >
      View Report
    </Button>
  )
}

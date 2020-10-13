import React, { useEffect } from 'react'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import {
  Grid,
  Typography,
  Breadcrumbs as MUIBreadcrumbs
} from '@material-ui/core'
import { InternalRouteBase } from 'v2/types/util'
import { useNewBreadcrumbs } from 'v2/hooks/useNewBreadcrumbs'

export interface BreadcrumbsProps {
  items: InternalRouteBase[]
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  // const { items } = props
  const { crumbs: items, reset } = useNewBreadcrumbs()
  const lastItem = items[items.length - 1]
  const links = items.slice(0, items.length - 1)

  useEffect(() => {
    return () => reset()
  }, [])
  // console.log(data)
  return (
    <Grid container>
      <MUIBreadcrumbs aria-label='breadcrumb'>
        {links.map(({ label, path }) => (
          <AppRouterLink to={path} underline='hover' color='primary'>
            {label}
          </AppRouterLink>
        ))}
        {lastItem !== undefined && <Typography>{lastItem.label}</Typography>}
      </MUIBreadcrumbs>
    </Grid>
  )
}

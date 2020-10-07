import React from 'react'
import { AppRouterLink } from '../../../components/AppRouterLink'
import {
  Grid,
  Typography,
  Breadcrumbs as MUIBreadcrumbs
} from '@material-ui/core'
import { InternalRouteBase } from '../../../types/util'

export interface BreadcrumbsProps {
  items: InternalRouteBase[]
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { items } = props
  const lastItem = items[items.length - 1]
  const links = items.slice(0, items.length - 1)

  return (
    <Grid container>
      <MUIBreadcrumbs aria-label='breadcrumb'>
        {links.map(({ label, path }) => (
          <AppRouterLink to={path} color='inherit'>
            {label}
          </AppRouterLink>
        ))}
        {lastItem !== undefined && <Typography>{lastItem.label}</Typography>}
      </MUIBreadcrumbs>
    </Grid>
  )
}

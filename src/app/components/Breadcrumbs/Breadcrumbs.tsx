import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import React from 'react'
import { useParams } from 'react-router-dom'

export const Breadcrumbs = () => {
  const params = useParams()
  const { crumbs } = useBreadcrumbs()
  const crumbsLength = crumbs.length
  const lastCrumb = crumbs[crumbsLength - 1]
  const links = crumbs.slice(0, crumbsLength - 1)

  return (
    <MuiBreadcrumbs>
      {links.map(({ label, path }) => (
        <AppRouterLink key={path} to={path} params={params}>
          {label}
        </AppRouterLink>
      ))}
      {lastCrumb !== undefined && <Typography>{lastCrumb.label}</Typography>}
    </MuiBreadcrumbs>
  )
}

import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { GridJustification } from '@material-ui/core/Grid/Grid'
import { VSpacer } from '../../../components/VSpacer'
import { InternalRouteBase } from '../../../types/util'

export interface PageHeaderProps {
  label: string
  alignment?: GridJustification
  breadcrumbs?: InternalRouteBase[]
}

export const PageHeader = (props: PageHeaderProps) => {
  const { label, alignment = 'flex-start', breadcrumbs } = props

  return (
    <>
      <Grid container justify={alignment}>
        <Typography variant='h2'>{label}</Typography>
      </Grid>
      <VSpacer size='small' />
      {breadcrumbs !== undefined && (
        <Grid>
          <Breadcrumbs items={breadcrumbs} />
        </Grid>
      )}
      <VSpacer size='small' />
    </>
  )
}

import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { GridJustification } from '@material-ui/core/Grid/Grid'
import { VSpacer } from 'v2/components/VSpacer'
import { useBreadcrumbs } from 'v2/hooks/useBreadcrumbs'

export interface PageHeaderProps {
  label?: string
  alignment?: GridJustification
  showBreadcrumbs?: boolean
}

export const PageHeader = (props: PageHeaderProps) => {
  const { label, alignment = 'flex-start', showBreadcrumbs = true } = props
  const breadcrumbs = useBreadcrumbs()
  const current = breadcrumbs[breadcrumbs.length - 1]

  return (
    <>
      <Grid container justify={alignment}>
        <Typography variant='h2'>{label ?? current?.label ?? ''}</Typography>
      </Grid>
      <VSpacer size='small' />
      {showBreadcrumbs && (
        <Grid>
          <Breadcrumbs items={breadcrumbs} />
        </Grid>
      )}
      <VSpacer size='small' />
    </>
  )
}

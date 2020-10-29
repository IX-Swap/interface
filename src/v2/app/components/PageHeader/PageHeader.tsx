import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs } from 'v2/app/components/Breadcrumbs/Breadcrumbs'
import { GridJustification } from '@material-ui/core/Grid/Grid'
import { VSpacer } from 'v2/components/VSpacer'
import { useBreadcrumbs } from 'v2/hooks/useBreadcrumbs'
import { useAppState } from 'v2/app/hooks/useAppState'

export interface PageHeaderProps {
  label?: string
  alignment?: GridJustification
  showBreadcrumbs?: boolean
}

export const PageHeader = (props: PageHeaderProps) => {
  const { label, alignment, showBreadcrumbs = true } = props
  const { crumbs } = useBreadcrumbs()
  const current = crumbs[crumbs.length - 1]
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const { pageTitle } = useAppState()

  return (
    <>
      <Grid container justify={justify}>
        <Typography variant='h2'>
          {pageTitle ?? current?.label ?? label ?? ''}
        </Typography>
      </Grid>
      <VSpacer size='small' />
      {showBreadcrumbs && (
        <Grid>
          <Breadcrumbs items={crumbs} />
        </Grid>
      )}
      <VSpacer size='medium' />
    </>
  )
}

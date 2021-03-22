import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import { GridJustification } from '@material-ui/core/Grid/Grid'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStyles } from './PageHeader.styles'
import { BackButton } from 'components/BackButton'

export interface PageHeaderProps {
  title?: string
  alignment?: GridJustification
  showBreadcrumbs?: boolean
  hasBackButton?: boolean
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    alignment = 'flex-start',
    hasBackButton = false,
    showBreadcrumbs = true
  } = props
  const { crumbs } = useBreadcrumbs()
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid container className={classes.header}>
        <Grid item container alignItems='center' justify={justify}>
          {hasBackButton && <BackButton className={classes.backButton} />}
          <Typography variant='h2'>{title}</Typography>
        </Grid>
      </Grid>
      {showBreadcrumbs && (
        <Grid>
          <Breadcrumbs items={crumbs} />
        </Grid>
      )}
    </Grid>
  )
}

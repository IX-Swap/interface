import React, { Fragment } from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStyles } from './PageHeader.styles'
import { BackButton } from 'components/BackButton'
import classnames from 'classnames'
import { Variant } from '@mui/material/styles/createTypography'

export interface PageHeaderProps {
  title?: string
  alignment?: string
  showBreadcrumbs?: boolean
  hasBackButton?: boolean
  variant?: Variant | 'inherit'
  noMargin?: boolean
  isNew?: boolean
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    alignment = 'flex-start',
    hasBackButton = false,
    showBreadcrumbs = true,
    variant = 'h2',
    noMargin = false,
    isNew = true
  } = props
  const { crumbs } = useBreadcrumbs()
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const classes = useStyles()
  const Wrapper = isNew ? Box : Fragment

  return (
    <Wrapper className={isNew ? classes.wrapper : ''}>
      <Grid
        container
        direction='column'
        className={classnames(classes.container, {
          [classes.noMargin]: noMargin
        })}
      >
        <Grid
          container
          className={classnames(classes.header, {
            [classes.noMargin]: noMargin
          })}
        >
          <Grid item container alignItems='center' justifyContent={justify}>
            {hasBackButton && <BackButton className={classes.backButton} />}
            <Typography variant={variant}>{title}</Typography>
          </Grid>
        </Grid>
        {showBreadcrumbs && (
          <Grid>
            <Breadcrumbs />
          </Grid>
        )}
      </Grid>
    </Wrapper>
  )
}

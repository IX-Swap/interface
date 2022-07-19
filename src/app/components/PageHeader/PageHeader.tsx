import React, { Fragment, useRef } from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStyles } from 'app/components/PageHeader/PageHeader.styles'
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
  styled?: boolean
  startComponent?: React.ReactNode
  endComponent?: React.ReactNode
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    alignment = 'flex-start',
    hasBackButton = false,
    showBreadcrumbs = true,
    variant = 'h2',
    noMargin = false,
    styled = true,
    startComponent,
    endComponent
  } = props
  const { crumbs } = useBreadcrumbs()
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const classes = useStyles()
  const Wrapper = styled ? Box : Fragment
  const hasCustomComponent =
    startComponent !== undefined || endComponent !== undefined

  const hasStartComponent = startComponent !== undefined
  const hasEndComponent = endComponent !== undefined

  const startComponentRef = useRef<any>()
  const startComponentWidth: number | undefined =
    startComponentRef.current?.clientWidth
  const pr =
    justify === 'center' && hasStartComponent && !hasEndComponent
      ? `${(startComponentWidth ?? 0) + 24}px`
      : 0

  const endComponentRef = useRef<any>()
  const endComponentWidth: number | undefined =
    endComponentRef.current?.clientWidth
  const pl =
    justify === 'center' && hasEndComponent && !hasStartComponent
      ? `${(endComponentWidth ?? 0) + 24}px`
      : 0

  return (
    <Wrapper className={styled ? classes.wrapper : ''}>
      <Container>
        <Grid
          container
          flexWrap='nowrap'
          justifyContent={hasCustomComponent ? 'space-between' : 'flex-start'}
          spacing={3}
        >
          {hasStartComponent && (
            <Grid item>
              <Box ref={startComponentRef}>{startComponent}</Box>
            </Grid>
          )}
          <Grid
            item
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
              sx={{
                pr,
                pl
              }}
            >
              <Grid item container alignItems='center' justifyContent={justify}>
                {hasBackButton && <BackButton className={classes.backButton} />}
                <Typography
                  className={styled ? classes.title : ''}
                  variant={variant}
                >
                  {title}
                </Typography>
              </Grid>
            </Grid>
            {showBreadcrumbs && (
              <Grid
                item
                container
                alignItems='center'
                sx={{
                  pr,
                  pl
                }}
                justifyContent={justify}
              >
                <Breadcrumbs />
              </Grid>
            )}
          </Grid>
          {hasEndComponent && (
            <Grid item>
              <Box ref={endComponentRef}>{endComponent}</Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Wrapper>
  )
}

import React, { Fragment, useRef } from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStyles } from 'app/components/PageHeader/PageHeader.styles'
import { Variant } from '@mui/material/styles/createTypography'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import classNames from 'classnames'

export interface PageHeaderProps {
  title?: string
  padded?: boolean
  alignment?: string
  showBreadcrumbs?: boolean
  hasBackButton?: boolean
  variant?: Variant | 'inherit'
  noMargin?: boolean
  styled?: boolean
  startComponent?: React.ReactNode
  endComponent?: React.ReactNode
  titleComponent?: React.ReactNode
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    alignment = 'flex-start',
    showBreadcrumbs = true,
    padded = false,
    variant = 'h2',
    styled = true,
    startComponent,
    endComponent,
    titleComponent
  } = props
  const { crumbs } = useBreadcrumbs()
  const { isTablet } = useAppBreakpoints()
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const classes = useStyles()
  const Wrapper = styled || padded ? Box : Fragment
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
  const className = styled
    ? classNames(classes.wrapper, classes.padded)
    : padded
    ? classNames(classes.padded)
    : ''
  return (
    <Wrapper className={className}>
      <Container>
        <Grid
          container
          flexWrap={isTablet ? undefined : 'nowrap'}
          justifyContent={hasCustomComponent ? 'space-between' : 'flex-start'}
          spacing={{ xs: 2, sm: 3 }}
        >
          {hasStartComponent && (
            <Grid item>
              <Box ref={startComponentRef} height='100%' width='100%'>
                {startComponent}
              </Box>
            </Grid>
          )}

          <Grid item flexGrow={1}>
            <Box
              sx={{
                height: '100%',
                pr,
                pl
              }}
            >
              {titleComponent !== undefined ? (
                <>{titleComponent}</>
              ) : (
                <Grid
                  container
                  height='100%'
                  direction='column'
                  justifyContent='center'
                >
                  <Grid item>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent={justify}
                    >
                      <Typography
                        className={styled ? classes.title : ''}
                        variant={variant}
                      >
                        {title}
                      </Typography>
                    </Box>
                  </Grid>
                  {showBreadcrumbs && !isTablet && (
                    <Grid item>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent={justify}
                      >
                        <Breadcrumbs />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Grid>

          {hasEndComponent && (
            <Grid item>
              <Box ref={endComponentRef} width='100%' height='100%'>
                {endComponent}
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Wrapper>
  )
}

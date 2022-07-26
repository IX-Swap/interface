import React, { Fragment, useRef } from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStyles } from 'app/components/PageHeader/PageHeader.styles'
import { Variant } from '@mui/material/styles/createTypography'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { getPadding } from 'app/components/PageHeader/utils'

export interface PageHeaderProps {
  title?: string
  subtitle?: string
  alignment?: string
  showBreadcrumbs?: boolean
  hasBackButton?: boolean
  variant?: Variant | 'inherit'
  noMargin?: boolean
  styled?: boolean
  startComponent?: React.ReactNode
  endComponent?: React.ReactNode
  titleComponent?: React.ReactNode
  wrapperStyle?: React.CSSProperties
  mainWrapperStyle?: React.CSSProperties
  titleWrapperStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    title,
    subtitle,
    alignment = 'flex-start',
    showBreadcrumbs = true,
    variant = 'h2',
    styled = true,
    startComponent,
    endComponent,
    titleComponent,
    wrapperStyle,
    mainWrapperStyle,
    titleWrapperStyle,
    titleStyle
  } = props
  const { crumbs } = useBreadcrumbs()
  const { isTablet } = useAppBreakpoints()
  const justify = alignment ?? (crumbs.length === 1 ? 'center' : 'flex-start')
  const classes = useStyles()
  const Wrapper = styled ? Box : Fragment

  const hasStartComponent = startComponent !== undefined
  const hasEndComponent = endComponent !== undefined

  const hasCustomComponent = hasStartComponent || hasEndComponent

  const startComponentRef = useRef<any>()
  const startComponentWidth: number | undefined =
    startComponentRef.current?.clientWidth
  const pr = getPadding(
    justify,
    hasStartComponent,
    hasEndComponent,
    startComponentWidth
  )

  const endComponentRef = useRef<any>()
  const endComponentWidth: number | undefined =
    endComponentRef.current?.clientWidth
  const pl = getPadding(
    justify,
    hasEndComponent,
    hasStartComponent,
    endComponentWidth
  )

  return (
    <Wrapper style={wrapperStyle} className={styled ? classes.wrapper : ''}>
      <Container>
        <Grid
          container
          flexWrap={isTablet ? undefined : 'nowrap'}
          style={mainWrapperStyle}
          justifyContent={hasCustomComponent ? 'space-between' : 'flex-start'}
          alignItems={'center'}
          spacing={isTablet ? 1 : 3}
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
              style={titleWrapperStyle}
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
                        style={titleStyle}
                      >
                        {title}
                      </Typography>
                    </Box>
                    {subtitle !== undefined && (
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent={justify}
                        paddingTop={1}
                      >
                        <Typography color={'text.secondary'}>
                          {subtitle}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {showBreadcrumbs && !isTablet && (
                    <Grid item>
                      <Box
                        display='flex'
                        alignItems='center'
                        justifyContent={justify}
                        mt={1}
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

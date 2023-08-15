import { Box, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useStyles } from 'app/components/LandingPage/LandingPageItem.styles'
import { AppRouterLink } from 'components/AppRouterLink'
import { InternalRouteProps } from 'types/util'
import { Noop } from 'components/Noop'
import { getCurrentLocationData } from 'hooks/location/utils'
import { safeGeneratePath } from 'helpers/router'
import { AppFeature } from 'types/app'
import { useAuthorizerPendingItems } from 'app/pages/authorizer/hooks/useAuthorizerPendingItems'
import { useHistory } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

export interface LandingPageItemProps {
  link: InternalRouteProps
  variant?: number
}

export const LandingPageItem = (props: LandingPageItemProps) => {
  const {
    link: { path, icon = Noop, label }
  } = props
  const theme = useTheme()
  const classes = useStyles()
  const { location } = useHistory()
  let { feature: category, params } = getCurrentLocationData(
    safeGeneratePath(path, {})
  )
  if (params.includes('accreditation')) {
    if (category === AppFeature.Individuals)
      category = AppFeature.IndividualsAccreditation
    if (category === AppFeature.Corporates)
      category = AppFeature.CorporatesAccreditation
  }
  const { total, status } = useAuthorizerPendingItems(category as any)
  return (
    <AppRouterLink to={path}>
      <Grid
        container
        item
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        className={classes.container}
      >
        <Grid item>
          <Box
            className={classes.iconWrapper}
            style={{
              backgroundColor: theme.palette.primary.main,
              position: 'relative'
            }}
          >
            {status !== 'loading' &&
              location?.pathname?.includes('authorizer') &&
              total > 0 && (
                <Typography
                  variant='h6'
                  style={{
                    color: 'white',
                    fontSize: '10px',
                    left: '50px',
                    position: 'absolute',
                    top: '-5px',
                    background: 'red',
                    borderRadius: total <= 100 ? '20px' : '200px',
                    padding:
                      total <= 9
                        ? '5px 10px 5px 10px'
                        : total <= 99
                        ? '5px 7px 5px 7px'
                        : '5px'
                  }}
                >
                  {total > 999 ? 999 : total}
                </Typography>
              )}
            {React.createElement(icon)}
          </Box>
        </Grid>
        <VSpacer size='small' />
        <Grid item>
          <Typography className={classes.label} color='textPrimary'>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </AppRouterLink>
  )
}

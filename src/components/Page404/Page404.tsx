import React from 'react'
import { Button, Box, Grid, Typography, Link } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { useTheme } from '@material-ui/core/styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AppLogo } from 'app/components/AppLogo/AppLogo'
import useStyles from './Pages404.style'

export const Page404 = () => {
  const theme = useTheme()
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()
  const isLightThemeOn = theme.palette.type === 'light'

  return (
    <Box className={classes.container}>
      <Grid container direction={'column'} className={classes.wrapper}>
        <Grid
          item
          container
          justifyContent={isMobile ? 'center' : 'flex-start'}
          alignItems={'flex-start'}
          className={classes.topBlock}
        >
          <Grid item>
            <AppLogo color={isLightThemeOn} />
          </Grid>
        </Grid>

        <Grid
          className={classes.mainContent}
          container
          spacing={2}
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item>
            <Typography
              variant={'h1'}
              align={'center'}
              className={classes.title}
            >
              We lost this page
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              variant='body1'
              align={'center'}
              className={classes.description}
            >
              Our best engineers are fixing the problem. In the meantime, you
              can explore our exciting features.
            </Typography>
          </Grid>

          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              to='/'
              color={'primary'}
              variant={'contained'}
              className={classes.button}
            >
              Return to home page
            </Button>
          </Grid>

          <Grid item>
            <Link href={'mailto:support@investax.io'} className={classes.link}>
              <MailOutlineIcon />
              <Typography variant={'body1'} className={classes.linkText}>
                support@investax.io
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

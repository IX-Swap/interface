import React from 'react'
import { Button, Grid, Typography, Link } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { FallbackProps } from 'react-error-boundary'
import BGImage from 'assets/images/500BG.png'
import BGError from 'assets/images/500 Error.svg'
import { AppRouterLinkComponent } from './AppRouterLink'
export const AppError = (_props: FallbackProps) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: {
          xs: 'center',
          lg: 'start'
        }
      }}
    >
      <Grid
        item
        xs={6}
        zIndex={-1}
        sx={{
          display: {
            xs: 'none',
            lg: 'block'
          },
          marginRight: '150px'
        }}
      >
        <img
          style={{ position: 'absolute' }}
          src={BGImage}
          alt={'Background'}
        />
        <img
          style={{ position: 'relative', top: '194px', left: '80px' }}
          src={BGError}
          alt={'Error'}
        />
      </Grid>
      <Grid item xs={10} md={8} lg={4}>
        <Grid>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '80px',
              color: '#DA223A',
              fontWeight: 'bold',
              marginTop: '240px',
              marginBottom: '40px'
            }}
          >
            500 ERROR
          </Typography>
          <Typography
            style={{
              fontSize: '24px',
              margin: '8px 0px 25px 0px',
              textAlign: 'center'
            }}
          >
            Sorry, an error has occurred!
          </Typography>
          <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
            Our best engineers are fixing the problem. In the meantime, try
            reloading the page or click the button below to return to home page.
          </Typography>
          <Grid marginTop={5} textAlign={'center'}>
            <Button
              sx={{ padding: '20px 35px 20px 35px', fontSize: '20px' }}
              color='primary'
              variant='contained'
              component={AppRouterLinkComponent}
              to='/'
            >
              Return to Home Page
            </Button>
          </Grid>

          <Grid textAlign={'center'} marginTop={5}>
            <Link
              sx={{
                fontSize: 18,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: '10px',
                marginTop: '30px'
              }}
              href={'mailto:support@investax.io'}
            >
              <MailOutlineIcon sx={{ marginRight: '5px' }} color='disabled' />
              <Typography color={'#778194'} variant={'body1'}>
                support@investax.io
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

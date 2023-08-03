import React from 'react'
import { Button, Grid, Typography, Link } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { FallbackProps } from 'react-error-boundary'
import BGImage from 'assets/images/500BG.png'
import BGError from 'assets/images/500 Error.svg'
import { AppRouterLinkComponent } from './AppRouterLink'
export const AppError = (_props: FallbackProps) => {
  return (
    <Grid container>
      <Grid item xs={7}>
        <img style={{ position: 'absolute' }} src={BGImage}></img>
        <img
          style={{ position: 'relative', top: '194px', left: '80px' }}
          src={BGError}
        ></img>
      </Grid>
      <Grid item xs={4}>
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
            Our best engineers are fixing the problem. <br />
            In the meantime, try reloading the page or <br /> click the button
            below to return to home <br /> page.
          </Typography>
          <Grid marginTop={5} textAlign={'center'}>
            <Button
              sx={{ padding: '20px 35px 20px 35px', fontSize: '20px' }}
              color='primary'
              variant='contained'
            >
              Return to Home Page
            </Button>
          </Grid>

          <Grid textAlign={'center'} marginTop={5}>
            <Link
              component={AppRouterLinkComponent}
              to='/'
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
              <MailOutlineIcon sx={{ marginRight: '10px' }} color='disabled' />
              <Typography color={'#778194'} variant={'body1'}>
                support@investax.io
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}

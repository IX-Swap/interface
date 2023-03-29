import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'

import { useMyInfoAuthorize } from 'hooks/auth/useMyInfoAuthorize'
import { Redirect } from 'react-router-dom'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { history } from 'config/history'
import { Card, CardContent } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

import { ReactComponent as SingpassLogo } from 'assets/singpass-logo-color.svg'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'

export interface SingPassProps {
  data?: any
}

export const SingPassPage = (props: SingPassProps) => {
  const { data, isError, isLoading: authorizeLoading } = useMyInfoAuthorize()
  console.log(data, 'datataat')
  console.log(props, 'datataatprp')
  const onCancel = (_: any) => {
    window.location.href = AuthRoute.login
    localStorage.setItem('singpassPage', 'true')
  }
  const onAgree = (_: any) => {
    window.location.href = AuthRoute.signup
    localStorage.setItem('singpassPage', 'true')
  }
  
  return (
    <>
      <Card
        variant='elevation'
        style={{
          height: '60%',
          width: '100%',
          borderRadius: 8,
          marginTop: 50,
          boxShadow: 'none'
        }}
      >
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              height: '100%',
              padding: '10px',
              width: '100%',
              background: '#E6E5E8',
              borderTop: '5px solid red'
            }}
          >
            <Grid style={{ textAlign: 'center' }}>
              <Box pt={1}>
                <SingpassLogo width={200} />
              </Box>
            </Grid>
            <div
              style={{
                // textAlign: 'center',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#504E56',
                margin: '20px'
              }}
            >
              Singpass retrieves personal data from relevant government agencies
              to pre-fill the relevant fields, making digital transactions
              faster and more convenient.
            </div>
            <div
              style={{
                // textAlign: 'center',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#201E25',
                margin: '20px'
              }}
            >
              This digital service InvestaX, Ic Sg Pte. Ltd., is requesting the
              following information from Singpass, for the purpose of form
              filling.
            </div>
          </div>
          <div
            style={{
              // textAlign: 'center',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '22px',
              color: '#201E25',
              padding: '20px',
              //   paddingLeft: '6px',
              background: '#FFFFFF'
              // clear: 'both',
              // float: 'left'
              // display: 'flex'
            }}
          >
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>NRIC/FIN : </p>
              <p style={{ margin: '6px', color: 'red' }}>
                {' '}
                {data?.uinfin ? data?.uinfin : '-'}
              </p>
            </div>

            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Name: </p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.name ? data?.name : '-'}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Nationality/Citizenship: </p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.nationality ? data?.nationality : ''}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Date of Birth: </p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.dob ? data?.dob : '-'}
              </p>
            </div>

            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Email: </p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.email ? data?.email : '-'}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Mobile Number:</p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.mobileno ? data?.mobileno : '-'}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Registered Address:</p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.regadd?.line1}
                {data?.regadd?.line2}
                {data?.regadd?.city}
                {data?.regadd?.country}
                {data?.regadd?.postalCode}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Employment Sector:</p>
              <p style={{ margin: '6px', color: 'red' }}>
                {data?.employmentsector ? data?.employmentsector : '-'}
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>
                IRAS Notice of Assessment (Last 2 Years):
              </p>
              <p style={{ margin: '6px' }}>-</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <p
        style={{
          //   marginLeft: '25%',
          //   marginRight: '25%',
          fontSize: '14px',
          textAlign: 'left',
          color: 'white',
          marginTop: '40px',
          marginBottom: '40px'
        }}
      >
        Clicking the “I Agree” button permits this digital service to retrieve
        your data based on the{' '}
        <a
          style={{ color: '#CF0B15', cursor: 'hover', textDecoration: 'none' }}
          href='https://www.singpass.gov.sg/home/ui/terms-of-use'
        >
          Terms of Use.
        </a>
      </p>
      <div style={{ display: 'flex', margin: '0 auto', marginBottom: '40px' }}>
        <button
          onClick={onCancel}
          style={{
            // marginRight: '10%',
            // marginLeft: 500,
            // marginRight: '100px',
            marginRight: '10%',
            marginLeft: '16%',
            color: '#7A787F',
            boxShadow: 'none',
            background: '#FFFFFF',
            boxSizing: 'border-box',
            border: '2px solid #E6E5E8',
            padding: '16px 32px',
            textAlign: 'center',
            letterSpacing: '0px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>

        <button
         onClick={onAgree}
          // <AppRouterLink to={AuthRoute.signup}>        </AppRouterLink>
          style={{
            color: '#FFFFFF',
            boxShadow: 'none',
            background: '#CF0B15',
            boxSizing: 'border-box',
            border: 'transparent',
            padding: '16px 32px',
            textAlign: 'center',
            letterSpacing: '0px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          I Agree
        </button>
      </div>
    </>
  )
}

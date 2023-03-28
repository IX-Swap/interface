import React, { useEffect } from 'react'
// import {
//   registerFormValidationSchema,
//   singpassFormValidationSchema
// } from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Box, Grid } from '@mui/material'
// import { Form } from 'components/form/Form'
// import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
// import { Submit } from 'components/form/Submit'
// import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useMyInfoAuthorize } from 'hooks/auth/useMyInfoAuthorize'
import { Redirect } from 'react-router-dom'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { history } from 'config/history'
import { Card, CardContent } from '@mui/material'
import { Icon } from 'ui/Icons/Icon'

import { ReactComponent as SingpassLogo } from 'assets/singpass-logo-color.svg'

export const registerFormInitialValues = {
  isMyInfo: false,
  name: '',
  email: '',
  password: '',
  agree: false
}

export const SingPassPage: React.FC = observer(() => {
  const [signup, { isLoading }] = useSignup()
  const { updateFilter, getFilterValue } = useQueryFilter()
  const identity = getFilterValue('identityType')
  const isIndividual = identity === 'individual'

  useEffect(() => {
    if (identity === undefined || identity === '') {
      updateFilter('identityType', 'individual')
    }
  }, [identity, updateFilter])

  const handleIdentityChange = () => {
    if (isIndividual) {
      updateFilter('identityType', 'corporate')
      return
    }

    updateFilter('identityType', 'individual')
  }

  const { data, isError, isLoading: authorizeLoading } = useMyInfoAuthorize()
  const isMyInfo = data !== undefined && getFilterValue('code') !== undefined
  console.log(data, 'datataat')
  const defaultFormValues = isMyInfo
    ? {
        isMyInfo: true,
        email: data?.email,
        phoneNumber: data?.mobileno,
        password: '',
        agree: true
      }
    : registerFormInitialValues

  const handleSubmit = async (values: SignupArgs) => {
    await signup(
      {
        name: values.name ?? 'Singpass User',
        email: values.email,
        singPassLogin: isMyInfo,
        mobileNo: values.phoneNumber,
        password: values.password,
        accountType: identity?.toLocaleUpperCase(),
        uinfin: data?.uinfin
      },
      isMyInfo
        ? {
            onError: (error: any) => {
              if (
                error?.message ===
                'Sorry but this email address is already taken'
              ) {
                history.push(`${AuthRoute.myinfoError}?errorType=email`)
              }
            }
          }
        : undefined
    )
  }

  if (authorizeLoading) {
    return <LoadingFullScreen />
  }

  if (data?.emailExists === true) {
    return <Redirect to={`${AuthRoute.myinfoError}?errorType=email`} />
  }

  if (isError) {
    return <Redirect to={`${AuthRoute.myinfoError}?errorType=connection`} />
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
          boxShadow: 'none',
          marginLeft: '25%',
          marginRight: '25%'
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
              margin: '20px',
              paddingLeft: '6px'
              // clear: 'both',
              // float: 'left'
              // display: 'flex'
            }}
          >
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>NRIC/FIN : </p>
              <p style={{ margin: '6px', color: 'red' }}> kapil</p>
            </div>

            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Name: </p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Nationality/Citizenship </p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Date of Birth </p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>

            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Email: </p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Mobile Number</p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Registered Address</p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>Employment Sector</p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Icon name={'chevron-right'} style={{ color: '#201E25' }} />
              <p style={{ margin: '6px' }}>
                IRAS Notice of Assessment (Last 2 Years)
              </p>
              <p style={{ margin: '6px' }}>kapil</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <p
        style={{
          marginLeft: '25%',
          marginRight: '25%',
          fontSize: '14px',
          textAlign: 'left',
          color: '#504E56',
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
          style={{
            // marginRight: '10%',
            // marginLeft: 500,
            marginRight: '100px',
            color: '#7A787F',
            boxShadow: 'none',
            background: '#FFFFFF',
            boxSizing: 'border-box',
            border: '2px solid #E6E5E8',
            padding: '16px 32px',
            textAlign: 'center',
            letterSpacing: '0px',
            fontSize: '16px',
            borderRadius: '4px'
          }}
        >
          Cancel
        </button>
        <button
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
            borderRadius: '4px'
          }}
        >
          I Agree
        </button>
      </div>
    </>
  )
})

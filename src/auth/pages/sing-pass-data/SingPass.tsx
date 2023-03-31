/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { Box, Grid, Card, CardContent } from '@mui/material'
import { useMyInfoAuthorize } from 'hooks/auth/useMyInfoAuthorize'
import { Icon } from 'ui/Icons/Icon'
import { ReactComponent as SingpassLogo } from 'assets/singpass-logo-color.svg'
import { AuthRoute } from 'auth/router/config'

export const SingPassPage = () => {
  const { data } = useMyInfoAuthorize()

  const onCancel = () => {
    window.location.href = AuthRoute.login
    localStorage.setItem('singpassPage', 'true')
  }
  const onAgree = (email: string, mobileno: string) => {
    window.location.href = `${AuthRoute.signup}?email=${email}&mobile=${mobileno}`
    localStorage.setItem('singpassPage', 'true')
  }

  const ChevronIcon = () => (
    <Icon
      name={'chevron-right'}
      color={'#201E25'}
      size={10}
      style={{ minWidth: '10px' }}
    />
  )

  const InfoItem = ({
    label,
    value = ''
  }: {
    label: string
    value: string
  }) => (
    <div style={{ padding: '3px' }}>
      <ChevronIcon />
      <span>{label} : </span>
      <span style={{ lineHeight: '30px', color: 'red' }}>
        {value.length > 0 ? value : '-'}
      </span>
    </div>
  )

  return (
    <div style={{ padding: '5px' }}>
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
        <CardContent style={{ padding: 0, width: '100%' }}>
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
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '22px',
              color: '#201E25',
              padding: '20px',
              background: '#FFFFFF'
            }}
          >
            <InfoItem label='NRIC/FIN' value={data?.uinfin} />
            <InfoItem label='Name' value={data?.name} />
            <InfoItem
              label='Nationality/Citizenship'
              value={data?.nationality}
            />
            <InfoItem label='Date of Birth' value={data?.dob} />
            <InfoItem label='Email' value={data?.email} />
            <InfoItem label='Mobile Number' value={data?.mobileno} />
            <InfoItem
              label='Registered Address'
              value={`
                ${data?.regadd?.line1}
                ${data?.regadd?.line2}
                ${data?.regadd?.city}
                ${data?.regadd?.country}
                ${data?.regadd?.postalCode}
            `}
            />
            <InfoItem
              label='Employment Sector'
              value={data?.employmentsector}
            />
            <InfoItem
              label='IRAS Notice of Assessment (Last 2 Years)'
              value={data?.noahistory?.noas
                ?.map((data: any) =>
                  Object.keys(data)?.map(dataItem => {
                    return ` ${dataItem}:${data[dataItem].value}`
                  })
                )
                .join()}
            />
          </div>
        </CardContent>
      </Card>
      <p
        style={{
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
          style={{
            color: '#CF0B15',
            cursor: 'hover',
            textDecoration: 'none'
          }}
          href='https://www.singpass.gov.sg/home/ui/terms-of-use'
        >
          Terms of Use.
        </a>
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '0 auto',
          marginBottom: '40px'
        }}
      >
        <button
          onClick={onCancel}
          style={{
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
          onClick={() => onAgree(data?.email, data?.mobileno)}
          style={{
            color: '#FFFFFF',
            boxShadow: 'none',
            background: '#CF0B15',
            boxSizing: 'border-box',
            border: '2px solid #CF0B15',
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
    </div>
  )
}

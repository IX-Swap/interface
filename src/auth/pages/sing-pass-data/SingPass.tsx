/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { AuthRoute } from 'auth/router/config'

interface SingPassPageProps {
  data: any
}

export const SingPassPage = (props: SingPassPageProps) => {
  const { data } = props

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
    <div>
      <ChevronIcon />
      <span style={{ fontSize: '12px' }}>{label} </span>
      <p
        style={{
          fontSize: '14px',
          color: '#FFFFFF',
          marginLeft: '10px',
          width: '216px',
          marginTop: '0px',
          marginBottom: '25px'
        }}
      >
        {value?.length > 0 ? value : '-'}
      </p>
    </div>
  )

  return (
    <div style={{ padding: '5px', marginLeft: '-39px' }}>
      <div>
        <div style={{ padding: 0, width: '100%', marginTop: 50 }}>
          <div
            style={{
              height: '100%',
              padding: '10px',
              width: '100%'
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '130%',
                color: '#FFFFFF',
                margin: '20px',
                letterSpacing: '0.2px',
                width: '100%'
              }}
            >
              Investax, IC SG Pte. Ltd., will use the gathered data to
              auto-populate your onboarding document.
            </div>
            <div
              style={{ borderBottom: 'solid 1px #595E60', marginLeft: '22px' }}
            ></div>
          </div>

          <div
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '22px',
              color: '#4E545C',
              padding: '20px'
            }}
          >
            <InfoItem label='NRIC/FIN' value={data?.uinfin} />
            <div style={{ display: 'flex', gap: '44%' }}>
              <InfoItem label='Name' value={data?.name} />
              <InfoItem
                label='Nationality/Citizenship'
                value={data?.nationality}
              />
            </div>
            <div style={{ display: 'flex', gap: '44%' }}>
              {' '}
              <InfoItem label='Date of Birth' value={data?.dob} />
              <InfoItem label='Sex' value={data?.sex} />
            </div>

            <div style={{ display: 'flex', gap: '44%' }}>
              {' '}
              <InfoItem label='Email' value={data?.email} />
              <InfoItem label='Mobile Number' value={data?.mobileno} />
            </div>
            <div style={{ display: 'flex', gap: '44%' }}>
              {' '}
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
              <InfoItem label='Occupation' value={data?.occupation} />
            </div>

            <InfoItem
              label='IRAS Notice of Assessment (Last 2 Years)'
              value={data?.noahistory?.noas
                ?.map((data: any) =>
                  Object.keys(data)?.map(dataItem => {
                    return ` ${dataItem}:${data[dataItem]?.value}`
                  })
                )
                ?.join()}
            />
          </div>
          <div
            style={{ borderBottom: 'solid 1px #595E60', marginLeft: '22px' }}
          ></div>
        </div>
      </div>
      <p
        style={{
          fontSize: '12px',
          textAlign: 'left',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '40px',
          marginBottom: '40px',
          marginLeft: '20px',
          lineHeight: '138%'
        }}
      >
        Clicking the “I Agree” button permits this digital service to retrieve
        your data based on the{' '}
        <a
          style={{
            color: '#FFFFFF',
            cursor: 'hover',
            textDecoration: 'none',
            fontSize: '12px',
            lineHeight: '138%'
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
          marginBottom: '40px',
          gap: '39%'
        }}
      >
        <button
          onClick={onCancel}
          style={{
            width: '230px',
            marginLeft: '18px',
            color: '#FFFFFF',
            boxShadow: 'none',
            background: '#11295D',
            boxSizing: 'border-box',
            border: '2px solid #11295D',
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
            width: '230px',
            color: '#FFFFFF',
            boxShadow: 'none',
            background: '#0000FF',
            boxSizing: 'border-box',
            border: '2px solid #0000FF',
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

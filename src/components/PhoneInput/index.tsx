import React, { ReactChildren } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { TYPE } from 'theme'

interface Props {
  value?: string
  onChange: (value: string) => void
  label?: string
  onBlur?: (e: any) => void
  error?: any | ReactChildren
}

export const PhoneInput = ({ value, onChange, label, onBlur, error }: Props) => {
  return (
    <Container>
      <Label>{t`${label || 'Phone Number'}`}</Label>
      <ReactPhoneInput onBlur={onBlur} country={'us'} value={value} onChange={onChange} />
      {error && (
        <TYPE.small marginTop="-8px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Container>
  )
}

const Label = styled.div`
  color: ${({ theme }) => theme.text2};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  .react-tel-input,
  .form-control {
    height: 60px;
    position: relative;
  }
  .react-tel-input {
    background-color: transparent;
    border-radius: 36px;
    border: ${({ theme: { bg12 } }) => `1px solid ${bg12}40`};
  }

  .form-control {
    position: relative;
    padding: 18px 20px 18px 52px;
    border-radius: 36px;
    background-color: ${({ theme: { bg12 } }) => `${bg12}40`};
    color: white;
    border: none;
    width: 100%;
  }
  .form-control:focus {
    background-color: ${({ theme }) => theme.bg7};
    .react-tel-input {
      border-color: ${({ theme: { bg10 } }) => `${bg10}50`};
    }
    box-shadow: none;
  }

  .country-list {
    border-radius: 32px;
    margin: 4px 0px;
    padding: 24px 8px 24px 16px;
    > li {
      margin-bottom: 4px;
    }
    background-color: ${({ theme }) => theme.bg7};
    top: 100%;
    .highlight,
    .prefered {
      background-color: ${({ theme }) => theme.bg11} !important;
      color: ${({ theme }) => theme.white} !important;
      font-weight: bold;
    }
    .country {
      display: flex;
      align-items: center;
      padding: 2px 12px;
      font-size: 16px;
      color: ${({ theme }) => theme.text9};
      border-radius: 12px;

      .flag {
        position: initial;
        margin-right: 12px;
        margin-top: -4px;
      }
    }
  }

  .country:hover {
    background-color: ${({ theme }) => `${theme.bg12}40 !important`};
  }

  .flag-dropdown.open {
    .arrow {
      border: none;
      transform: rotate(270deg);
    }
  }

  .selected-flag {
    padding-left: 20px;
    position: inherit;
    .arrow {
      display: none;
    }
  }
`

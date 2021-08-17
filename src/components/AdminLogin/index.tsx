import React, { ChangeEvent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'

import { ButtonIXSWide } from '../Button'
import Loader from '../Loader'
import { LoaderThin } from '../Loader/LoaderThin'
import { useAdminState, useLogin } from '../../state/admin/hooks'

export const AdminLogin = () => {
  const { adminLoading } = useAdminState()
  const login = useLogin()

  const [values, handleValues] = useState({ email: '', password: '' })
  const [error, handleError] = useState('')

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    handleValues((state) => ({ ...state, [name]: value }))
  }

  const validate = () => {
    const emailRegexp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!values.email) {
      handleError(t`Enter the email`)
      return
    }

    if (!emailRegexp.test(values.email.toLowerCase())) {
      handleError(t`Enter a valid email`)
      return
    }

    if (!values.password) {
      handleError(t`Enter the password`)
      return
    }
    handleError('')
  }

  useEffect(() => {
    validate()
  }, [values])

  const submit = () => {
    login(values)
  }

  return (
    <div>
      <Title>Login</Title>
      <Input
        autoComplete="new-password"
        name="email"
        type="email"
        placeholder={t`Email`}
        value={values.email}
        onChange={onValueChange}
      />
      <Input
        autoComplete="new-password"
        name="password"
        type="password"
        placeholder={t`Password`}
        value={values.password}
        onChange={onValueChange}
      />
      <ButtonContainer>
        <ButtonIXSWide onClick={submit} disabled={Boolean(error) || adminLoading}>
          <Trans>{error || 'Login'}</Trans>
          {adminLoading && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
        </ButtonIXSWide>
      </ButtonContainer>
    </div>
  )
}

const LoaderContainer = styled.div`
  margin-left: 15px;
`

const ButtonContainer = styled.div`
  margin-top: 31px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 41px;
`

const Input = styled.input`
  background-color: ${({ theme, value }) => (value ? theme.bg7 : theme.bg12)};
  font-weight: 600;
  font-size: 22px;
  border-radius: 36px;
  width: 100%;
  height: 74px;
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: #edceff50;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 16px 32px;
  margin-bottom: 35px;
`

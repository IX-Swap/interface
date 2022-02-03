import React from 'react'
import { render } from 'test-utils'
import { Step1RemoveAuthenticator } from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator'
import * as useGetEmailCode from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'
import { RemoveAuthenticatorForm } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm'

jest.mock(
  'app/pages/security/pages/update2fa/components/ResendCode/ResendCode',
  () => ({
    ResendCode: jest.fn(() => null)
  })
)
jest.mock(
  'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm',
  () => ({
    RemoveAuthenticatorForm: jest.fn(() => null)
  })
)

describe('Step1RemoveAuthenticator', () => {
  const handleSuccessfulRemoveAuthenticator = jest.fn()

  const getEmailCodeSuccessfulResponse = {
    data: { email: 'test' }
  }

  const getEmailCodeUnsuccessfulResponse = {
    data: undefined
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders send code button when data is undefined', () => {
    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => getEmailCodeUnsuccessfulResponse as any)

    const { getByText } = render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(getByText('Send code')).toBeInTheDocument()
  })

  it('renders components when data is not undefined', () => {
    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => getEmailCodeSuccessfulResponse as any)

    render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(ResendCode).toHaveBeenCalled()
    expect(RemoveAuthenticatorForm).toHaveBeenCalledWith(
      expect.objectContaining({
        email: getEmailCodeSuccessfulResponse.data.email
      }),
      {}
    )
  })
})

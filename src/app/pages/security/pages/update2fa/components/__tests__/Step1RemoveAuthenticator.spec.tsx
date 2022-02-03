import React from 'react'
import { render } from 'test-utils'
import { Step1RemoveAuthenticator } from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator'
import * as useGetEmailCode from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'
import { RemoveAuthenticatorForm } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm'
import { fireEvent, waitFor } from '@testing-library/dom'

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
    data: { email: 'test' },
    refetch: jest.fn()
  }

  const getEmailCodeUnsuccessfulResponse = {
    data: undefined,
    refetch: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders send code button when data is undefined, revoke refetch on click', async () => {
    jest
      .spyOn(useGetEmailCode, 'useGetEmailCode')
      .mockImplementation(() => getEmailCodeUnsuccessfulResponse as any)

    const { getByText } = render(
      <Step1RemoveAuthenticator
        onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
      />
    )

    expect(getByText('Send code')).toBeInTheDocument()
    fireEvent.click(getByText('Send code'))

    await waitFor(() => {
      expect(getEmailCodeUnsuccessfulResponse.refetch).toHaveBeenCalled()
    })
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

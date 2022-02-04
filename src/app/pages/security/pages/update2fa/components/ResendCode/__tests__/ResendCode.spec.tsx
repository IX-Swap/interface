import React from 'react'
import { render } from 'test-utils'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.useFakeTimers()

describe('ResendCode', () => {
  const getEmailCodeSuccessfulResponse = {
    data: { email: 'test' },
    refetch: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('renders disabled button', () => {
    const { getByText } = render(
      <ResendCode
        action={getEmailCodeSuccessfulResponse.refetch}
        data={getEmailCodeSuccessfulResponse.data}
      />
    )

    expect(getByText('Resend Code')).toBeInTheDocument()
    expect(getByText('Resend Code').parentElement).toBeDisabled()
  })

  it('enables button after 30 seconds', async () => {
    const { getByText } = render(
      <ResendCode
        action={getEmailCodeSuccessfulResponse.refetch}
        data={getEmailCodeSuccessfulResponse.data}
      />
    )

    jest.advanceTimersByTime(29000)

    expect(getByText('Resend Code').parentElement).toBeDisabled()

    jest.advanceTimersByTime(30000)

    expect(getByText('Resend Code').parentElement).toBeEnabled()
  })

  it('revoke action on button click when button is not disabled', async () => {
    const { getByText } = render(
      <ResendCode
        action={getEmailCodeSuccessfulResponse.refetch}
        data={getEmailCodeSuccessfulResponse.data}
      />
    )

    jest.runAllTimers()

    expect(getByText('Resend Code')).toBeInTheDocument()
    expect(getByText('Resend Code').parentElement).toBeEnabled()
    fireEvent.click(getByText('Resend Code'))

    await waitFor(() => {
      expect(getEmailCodeSuccessfulResponse.refetch).toHaveBeenCalled()
    })
  })
})

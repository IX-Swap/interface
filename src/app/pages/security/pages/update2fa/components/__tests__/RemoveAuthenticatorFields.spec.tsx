import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/dom'
import { RemoveAuthenticatorFields } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorFields/RemoveAuthenticatorFields'
import { Form } from 'components/form/Form'

describe('RemoveAuthenticatorFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('renders disabled button', () => {
    const { getByText } = render(
      <Form defaultValues={{ otp: '', emailCode: '' }}>
        <RemoveAuthenticatorFields isRemove2FALoading={false} />
      </Form>
    )

    expect(getByText('Remove and continue')).toBeInTheDocument()
    expect(getByText('Remove and continue')).toBeDisabled()
  })

  it('disables submit button when isLoading is true', async () => {
    const { getByText, container, getAllByPlaceholderText } = render(
      <Form defaultValues={{ otp: '', emailCode: '' }}>
        <RemoveAuthenticatorFields isRemove2FALoading={true} />
      </Form>
    )

    const otpFields = getAllByPlaceholderText('_')
    const emailCodeField = container.querySelector(
      'input[name="emailCode"]'
    ) as HTMLInputElement

    otpFields.forEach(otpField => {
      fireEvent.change(otpField, {
        target: {
          value: '1'
        }
      })
    })

    fireEvent.change(emailCodeField, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeDisabled()
    })
  })

  it('enables submit button if all fields gave 6 digits and isLoading is false', async () => {
    const { getByText, container, getAllByPlaceholderText } = render(
      <Form defaultValues={{ otp: '123456', emailCode: '123456' }}>
        <RemoveAuthenticatorFields isRemove2FALoading={false} />
      </Form>
    )

    const otpFields = getAllByPlaceholderText('_')
    const emailCodeField = container.querySelector('input[name="emailCode"]')

    fireEvent.change(emailCodeField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeDisabled()
    })

    otpFields.forEach(otpField => {
      fireEvent.change(otpField, {
        target: {
          value: '2'
        }
      })
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeEnabled()
    })
  })
})

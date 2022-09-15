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

    expect(getByText('Remove and Continue')).toBeInTheDocument()
    expect(getByText('Remove and Continue')).toBeDisabled()
  })

  it('disables submit button when isLoading is true', async () => {
    const { getByText, container, getAllByPlaceholderText } = render(
      <Form defaultValues={{ otp: '', emailCode: '' }}>
        <RemoveAuthenticatorFields isRemove2FALoading={true} />
      </Form>
    )

    const emailCodeField = container.querySelector(
      'input[name="emailCode"]'
    ) as HTMLInputElement

    fireEvent.change(emailCodeField, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and Continue')).toBeDisabled()
    })
  })

  it('enables submit button if all fields gave 6 digits and isLoading is false', async () => {
    const { getByText, container, getByDisplayValue } = render(
      <Form defaultValues={{ otp: '123456', emailCode: '123456' }}>
        <RemoveAuthenticatorFields isRemove2FALoading={false} />
      </Form>
    )

    const otpFields = [
      getByDisplayValue('1'),
      getByDisplayValue('2'),
      getByDisplayValue('3'),
      getByDisplayValue('4'),
      getByDisplayValue('5'),
      getByDisplayValue('6')
    ]
    const emailCodeField = container.querySelector('input[name="emailCode"]')

    fireEvent.change(emailCodeField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and Continue')).toBeDisabled()
    })

    otpFields.forEach(otpField => {
      fireEvent.change(otpField, {
        target: {
          value: '2'
        }
      })
    })

    await waitFor(() => {
      expect(getByText('Remove and Continue')).toBeEnabled()
    })
  })
})

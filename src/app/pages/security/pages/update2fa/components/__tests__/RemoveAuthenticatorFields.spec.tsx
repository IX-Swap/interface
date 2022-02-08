import React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/dom'
import { RemoveAuthenticatorFields } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorFields'
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
        <RemoveAuthenticatorFields email={'test'} isLoading={false} />
      </Form>
    )

    expect(getByText('Remove and continue')).toBeInTheDocument()
    expect(getByText('Remove and continue')).toBeDisabled()
  })

  it('disables submit button when isLoading is true', async () => {
    const { getByText, container } = render(
      <Form defaultValues={{ otp: '', emailCode: '' }}>
        <RemoveAuthenticatorFields email={'test'} isLoading={true} />
      </Form>
    )

    const otpField = container.querySelector('input[name="otp"]')
    const emailCodeField = container.querySelector('input[name="emailCode"]')

    fireEvent.change(otpField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })
    fireEvent.change(emailCodeField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeDisabled()
    })
  })

  it('enables submit button if all fields gave more than 6 digits and isLoading is false', async () => {
    const { getByText, container } = render(
      <Form defaultValues={{ otp: '', emailCode: '' }}>
        <RemoveAuthenticatorFields email={'test'} isLoading={false} />
      </Form>
    )

    const otpField = container.querySelector('input[name="otp"]')
    const emailCodeField = container.querySelector('input[name="emailCode"]')

    fireEvent.change(otpField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeDisabled()
    })

    fireEvent.change(emailCodeField as HTMLInputElement, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(getByText('Remove and continue')).toBeEnabled()
    })
  })
})

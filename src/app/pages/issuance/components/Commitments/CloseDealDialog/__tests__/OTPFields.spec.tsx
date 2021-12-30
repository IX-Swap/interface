import React from 'react'
import { render } from 'test-utils'
import { OTPFields } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('components/form/Submit', () => ({
  Submit: jest.fn(() => null)
}))

const handleClose = jest.fn()

describe('OTPFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders OTP with correct props', () => {
    render(
      <Form defaultValues={{ otp: '' }}>
        <OTPFields isLoading={false} onClose={handleClose} />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(1)
    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        customRenderer: true,
        name: 'otp',
        label: '',
        variant: 'outlined',
        shouldAutoFocus: true
      }),
      {}
    )
  })

  it('renders Cancel button', () => {
    const { getByText } = render(
      <Form defaultValues={{ otp: '' }}>
        <OTPFields isLoading={false} onClose={handleClose} />
      </Form>
    )

    const cancel = getByText('Cancel')
    expect(cancel).toBeInTheDocument()
  })

  it('invokes close function on close button click', async () => {
    const { getByText } = render(
      <Form defaultValues={{ otp: '' }}>
        <OTPFields isLoading={false} onClose={handleClose} />
      </Form>
    )

    const cancel = getByText('Cancel')
    fireEvent.click(cancel)
    await waitFor(() => {
      expect(handleClose).toBeCalled()
    })
  })

  it('renders Submit button with correct props', () => {
    render(
      <Form defaultValues={{ otp: '' }}>
        <OTPFields isLoading={false} onClose={handleClose} />
      </Form>
    )

    expect(Submit).toHaveBeenCalledTimes(1)
    expect(Submit).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 'large',
        variant: 'contained',
        color: 'primary',
        children: 'Confirm'
      }),
      {}
    )
  })
})

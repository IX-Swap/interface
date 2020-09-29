/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step4Enable } from 'v2/app/pages/security/pages/setup2fa/components/Step4Enable'
import { fireEvent, waitFor } from '@testing-library/react'
import * as enable2faHook from '../../hooks/useEnable2fa'

describe('Step4Enable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Step4Enable />)
  })

  it('handles user input on otp field', async () => {
    const otpValue = '123456'
    const { getByLabelText, getByTestId } = render(<Step4Enable />)

    const form = getByTestId('form')
    const otp = getByLabelText(/OTP/i)
    fireEvent.change(otp, { target: { value: otpValue } })

    await waitFor(() => {
      expect(form).toHaveFormValues({ otp: otpValue })
    })
  })

  it('handles form submission', async () => {
    const otpValue = '123456'
    const enable2fa = jest.fn()
    jest
      .spyOn(enable2faHook, 'useEnable2fa')
      .mockImplementation(() => [enable2fa] as any)

    const { getByLabelText, getByText } = render(<Step4Enable />)
    const otp = getByLabelText(/OTP/i)
    fireEvent.change(otp, { target: { value: otpValue } })
    fireEvent.click(getByText('Submit'))

    await waitFor(() => {
      expect(enable2fa).toHaveBeenCalledTimes(1)
      expect(enable2fa).toHaveBeenCalledWith({ otp: otpValue })
    })
  })
})

import React from 'react'
import { render, cleanup } from 'test-utils'
import Typography from '@material-ui/core/Typography'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const handleToggle = jest.fn()

describe('CloseDealDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CloseDealDialog open={false} toggleOpen={handleToggle} />)
  })

  it('renders Typography with correct props', () => {
    render(<CloseDealDialog open={true} toggleOpen={handleToggle} />)

    expect(Typography).toHaveBeenCalledTimes(3)
    expect(Typography).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        variant: 'body1',
        align: 'center',
        children: 'Investor will no longer be able to invest on this deal'
      }),
      {}
    )
    expect(Typography).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        variant: 'body2',
        align: 'center',
        children: 'Please enter OTP from your authenticator before proceeding'
      }),
      {}
    )
  })

  it('renders OTPForm', () => {
    const { getByTestId } = render(
      <CloseDealDialog open={true} toggleOpen={handleToggle} />
    )
    const form = getByTestId('otp-form')
    expect(form).toBeInTheDocument()
  })
})

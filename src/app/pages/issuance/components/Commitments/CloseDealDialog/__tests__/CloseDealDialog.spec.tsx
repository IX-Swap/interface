import React from 'react'
import { render } from 'test-utils'
import Typography from '@material-ui/core/Typography'
import { CloseDealDialog } from 'app/pages/issuance/components/Commitments/CloseDealDialog/CloseDealDialog'
import { fireEvent, waitFor } from '@testing-library/dom'
import * as useCloseDeal from 'app/pages/issuance/hooks/useCloseDeal'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const handleToggle = jest.fn()

describe('CloseDealDialog', () => {
  const mutate = jest.fn()

  beforeEach(() => {
    jest.spyOn(useCloseDeal, 'useCloseDeal').mockReturnValue({
      mutation: [mutate, { isLoading: false, status: 'success' } as any]
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
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

  it.skip('renders OTPForm', async () => {
    const { getByTestId } = render(
      <CloseDealDialog open={true} toggleOpen={handleToggle} />
    )

    const form = getByTestId('otp-form')
    expect(form).toBeInTheDocument()
    fireEvent.submit(form)
    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
      expect(handleToggle).toHaveBeenCalledTimes(1)
    })
  })
})

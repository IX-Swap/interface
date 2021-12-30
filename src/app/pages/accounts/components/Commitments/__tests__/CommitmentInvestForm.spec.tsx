import { CommitmentInvestForm } from 'app/pages/accounts/components/Commitments/CommitmentInvestForm'
import React from 'react'
import { render } from 'test-utils'
import { CommitmentInvestOTPDialog } from 'app/pages/accounts/components/Commitments/CommitmentInvestOTPDialog'

jest.mock(
  'app/pages/accounts/components/Commitments/CommitmentInvestOTPDialog',
  () => ({
    CommitmentInvestOTPDialog: jest.fn(() => null)
  })
)

describe('CommitmentInvestForm', () => {
  const submitFn = jest.fn()
  const closeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CommitmentInvestForm submit={submitFn} close={closeFn} open />)
  })

  it('renders otp dialog correctly', () => {
    render(<CommitmentInvestForm submit={submitFn} close={closeFn} open />)
    expect(CommitmentInvestOTPDialog).toHaveBeenCalledWith(
      {
        open: true,
        close: closeFn
      },
      {}
    )
  })
})

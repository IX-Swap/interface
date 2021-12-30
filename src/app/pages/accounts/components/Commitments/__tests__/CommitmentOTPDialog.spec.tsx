import { CommitmentInvestOTPDialog } from 'app/pages/accounts/components/Commitments/CommitmentInvestOTPDialog'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog',
  () => ({
    OTPDialogContent: jest.fn(() => null)
  })
)

describe('CommitmentOTPDialog', () => {
  const closeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CommitmentInvestOTPDialog close={closeFn} open />)
  })
})

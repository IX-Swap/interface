import React from 'react'
import { render } from 'test-utils'
import { WithdrawForm } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawForm'
import * as useCustodyWithdrawal from 'app/pages/accounts/hooks/useCustodyWithdrawal'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/TokensField',
  () => ({
    TokensField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawalAmount',
  () => ({
    WithdrawalAmount: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawTo',
  () => ({
    WithdrawTo: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/ConfirmButton',
  () => ({
    ConfirmButton: jest.fn(() => null)
  })
)

describe('WithdrawForm', () => {
  beforeEach(() => {
    const response = [jest.fn(), { isLoading: false, isSuccess: false }]

    jest
      .spyOn(useCustodyWithdrawal, 'useCustodyWithdrawal')
      .mockImplementation(() => response as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<WithdrawForm />)
  })
})

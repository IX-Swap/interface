import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateBank } from 'v2/app/pages/accounts/pages/banks/CreateBank/CreateBank'
import { useCreateBank } from 'v2/app/pages/accounts/pages/banks/hooks/useCreateBank'
import { BankForm } from 'v2/app/pages/accounts/pages/banks/components/BankForm'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useCreateBank')

const useCreateBankMock = (useCreateBank as unknown) as jest.Mock<
  Partial<ReturnType<typeof useCreateBank>>
>

jest.mock('v2/app/pages/accounts/pages/banks/components/BankForm', () => ({
  BankForm: jest.fn(() => <div data-testid='bank-form' />)
}))

describe('CreateBank', () => {
  const createBank = jest.fn()

  beforeEach(() => {
    useCreateBankMock.mockReturnValue([createBank])
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders BankForm without error', () => {
    render(<CreateBank />)
  })

  it('renders BankForm with correct props', () => {
    render(<CreateBank />)

    expect(BankForm).toHaveBeenCalledWith(
      {
        submitButtonLabel: 'Add Bank Account',
        onSubmit: createBank
      },
      {}
    )
  })
})

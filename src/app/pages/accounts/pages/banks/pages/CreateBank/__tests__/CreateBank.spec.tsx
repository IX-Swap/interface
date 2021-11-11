import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateBank } from 'app/pages/accounts/pages/banks/pages/CreateBank/CreateBank'
import { useCreateBank } from 'app/pages/accounts/pages/banks/hooks/useCreateBank'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'

jest.mock('app/pages/accounts/pages/banks/hooks/useCreateBank')

const useCreateBankMock = useCreateBank as unknown as jest.Mock<
  Partial<ReturnType<typeof useCreateBank>>
>

jest.mock('app/pages/accounts/pages/banks/components/BankForm', () => ({
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

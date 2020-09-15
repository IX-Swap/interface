/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { CreateBank } from 'v2/app/pages/accounts/pages/banks/CreateBank/CreateBank'
import { useCreateBank } from 'v2/app/pages/accounts/pages/banks/hooks/useCreateBank'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useCreateBank')

const useCreateBankMock = useCreateBank as jest.Mock<
  Partial<ReturnType<typeof useCreateBank>>
>

useCreateBankMock.mockReturnValue({ mutate: () => null })

jest.mock('v2/app/pages/accounts/pages/banks/components/BankForm', () => {
  const BankForm = jest.fn(() => <div data-testid='bank-form'></div>)
  return { BankForm }
})

describe('CreateBank', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders BankForm without error', () => {
    const { queryByTestId } = render(<CreateBank />)
    expect(queryByTestId('bank-form')).not.toBeNull()
  })

  it('calls useCreateBank with onSuccess callback', () => {
    render(<CreateBank />)

    expect(useCreateBank).toBeCalledTimes(1)
    expect(useCreateBank).toHaveBeenCalledWith({
      onSuccess: expect.any(Function)
    })
  })
})

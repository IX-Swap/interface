/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { DepositStoreProvider } from 'v2/app/pages/accounts/pages/banks/context'
import { Form } from 'v2/components/form/Form'
import * as validateWithdrawHook from 'v2/app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'
import { balance } from '__fixtures__/balance'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ isLoading: true })
    const { queryByRole } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ bank, amount: cashDeposit.amount }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )

    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if loading', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ isLoading: true })
    const { getByText } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ amount: cashDeposit.amount }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )
    const continueButton = getByText(/continue/i)

    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will disable Button if data is undefined', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ isLoading: false, data: undefined })
    const { getByText } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ bank }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )
    const continueButton = getByText(/continue/i)

    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will enable Button if error is undefined', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({
        isLoading: false,
        data: { bank: bank, balance: balance },
        error: undefined
      })
    const { getByText } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ bank }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )
    const continueButton = getByText(/continue/i)

    expect(continueButton.parentElement).not.toBeDisabled()
  })
})

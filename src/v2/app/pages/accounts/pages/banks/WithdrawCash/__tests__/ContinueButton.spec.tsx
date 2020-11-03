/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { DepositStoreProvider } from 'v2/app/pages/accounts/pages/banks/context'
import { Form } from 'v2/components/form/Form'
import * as validateWithdrawHook from 'v2/app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ canSubmit: true })
    const { queryByRole } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ bank, amount: cashDeposit.amount }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )

    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if canSubmit is false', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ canSubmit: false, error: '' })
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

  it('will enable Button if error is undefined', () => {
    jest
      .spyOn(validateWithdrawHook, 'useValidateWithdrawCash')
      .mockReturnValue({ canSubmit: true })
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

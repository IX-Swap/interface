import React from 'react'
import { render } from 'test-utils'
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { DepositStoreProvider } from 'app/pages/accounts/pages/banks/context'
import { Form } from 'components/form/Form'
import * as validateWithdrawHook from 'app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'

describe('ContinueButton', () => {
  afterEach(async () => {
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
      .mockReturnValue({ canSubmit: false })
    const { getByText } = render(
      <DepositStoreProvider>
        <Form defaultValues={{ amount: cashDeposit.amount }}>
          <ContinueButton />
        </Form>
      </DepositStoreProvider>
    )
    const continueButton = getByText(/confirm withdrawal/i)

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
    const continueButton = getByText(/confirm withdrawal/i)

    expect(continueButton.parentElement).not.toBeDisabled()
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'
import { bank, cashDeposit } from '__fixtures__/authorizer'
import { DepositStoreProvider } from 'v2/app/pages/accounts/pages/banks/context'
import { Form } from 'v2/components/form/Form'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    const { queryByRole } = render(
        <DepositStoreProvider>
      <Form defaultValues={{ bank, amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>
        </DepositStoreProvider>
    )

    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if bank is undefined', () => {
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

  it('will disable Button if amount is undefined', () => {
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
})

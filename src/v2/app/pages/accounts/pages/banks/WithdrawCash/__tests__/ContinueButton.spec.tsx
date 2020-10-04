/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'

import { bank, cashDeposit } from '__fixtures__/authorizer'
import * as banksContext from 'v2/app/pages/accounts/pages/banks/context'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/pages/accounts/pages/banks/context')

jest.spyOn(banksContext, 'useDepositStore').mockReturnValue({
  setCurrentStep () {
    return null
  }
})

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    const { queryByRole } = render(
      <Form defaultValues={{ bank, amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>
    )

    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if bank is undefined', () => {
    const { getByText } = render(
      <Form defaultValues={{ amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)

    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will disable Button if amount is undefined', () => {
    const { getByText } = render(
      <Form defaultValues={{ bank }}>
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)

    expect(continueButton.parentElement).toBeDisabled()
  })
})

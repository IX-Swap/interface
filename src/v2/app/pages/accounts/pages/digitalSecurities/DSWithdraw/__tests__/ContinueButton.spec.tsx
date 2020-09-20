/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { dsWithdrawal } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    const { queryByRole } = render(
      <Form
        defaultValues={{
          recipientWallet: dsWithdrawal.recipientWallet,
          amount: dsWithdrawal.amount
        }}
      >
        <ContinueButton />
      </Form>
    )
    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if recipientWallet is undefined', () => {
    const { getByText } = render(
      <Form
        defaultValues={{
          recipientWallet: undefined,
          amount: dsWithdrawal.amount
        }}
      >
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will disable Button if amount is undefined', () => {
    const { getByText } = render(
      <Form
        defaultValues={{
          recipientWallet: dsWithdrawal.recipientWallet,
          amount: undefined
        }}
      >
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { dsWithdrawal } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'
import { fireEvent } from '@testing-library/react'
import { DepositStoreStep } from '../../../banks/context/store'

describe('ContinueButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    const { queryByRole } = renderWithDepositStore(
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
    const { getByText } = renderWithDepositStore(
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
    const { getByText } = renderWithDepositStore(
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

  it('handles click on "Continue"', async () => {
    const fakeDepositStore = { setCurrentStep: jest.fn() }
    const { getByText } = renderWithDepositStore(
      <Form
        defaultValues={{
          recipientWallet: dsWithdrawal.recipientWallet,
          amount: dsWithdrawal.amount
        }}
      >
        <ContinueButton />
      </Form>,
      fakeDepositStore
    )
    const continueButton = getByText(/continue/i)

    fireEvent.click(continueButton)

    expect(fakeDepositStore.setCurrentStep).toBeCalledTimes(1)
    expect(fakeDepositStore.setCurrentStep).toBeCalledWith(
      DepositStoreStep.PREVIEW
    )
  })
})

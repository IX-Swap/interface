/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderWithDepositStore, cleanup, fireEvent, waitFor } from 'test-utils'
import { Form } from 'v2/components/form/Form'
import { asset, cashDeposit } from '__fixtures__/authorizer'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'

describe('ContinueButton', () => {
  const fakeDepositStore = { setCurrentStep: jest.fn() }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders Button without error', () => {
    const { queryByRole } = renderWithDepositStore(
      <Form defaultValues={{ asset, amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>
    )
    expect(queryByRole('button')).not.toBeNull()
  })

  it('will disable Button if asset is undefined', () => {
    const { getByText } = renderWithDepositStore(
      <Form defaultValues={{ amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })

  it('will disable Button if amount is undefined', () => {
    const { getByText } = renderWithDepositStore(
      <Form defaultValues={{ asset }}>
        <ContinueButton />
      </Form>
    )
    const continueButton = getByText(/continue/i)
    expect(continueButton.parentElement).toBeDisabled()
  })

  it('invokes setCurrentStep on button click', async () => {
    const { getByRole } = renderWithDepositStore(
      <Form defaultValues={{ asset, amount: cashDeposit.amount }}>
        <ContinueButton />
      </Form>,
      fakeDepositStore
    )

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(fakeDepositStore.setCurrentStep).toHaveBeenCalledTimes(1)
      expect(fakeDepositStore.setCurrentStep).toHaveBeenCalledWith(
        DepositStoreStep.PREVIEW
      )
    })
  })
})

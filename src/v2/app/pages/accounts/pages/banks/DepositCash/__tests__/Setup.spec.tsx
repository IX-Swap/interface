/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'
import { AssetSelect } from 'v2/components/form/AssetSelect'

jest.mock('v2/components/form/AssetSelect', () => ({
  AssetSelect: jest.fn(() => null)
}))

describe('Setup', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    const { getByLabelText } = render(
      <Form>
        <Setup />
      </Form>
    )

    const amountInput = getByLabelText(/amount/i)

    expect(AssetSelect).toHaveBeenCalledTimes(1)
    expect(amountInput).toBeTruthy()
  })

  it('renders amount input disabled if asset is undefined', () => {
    const { getByLabelText } = render(
      <Form defaultValues={{ asset: undefined }}>
        <Setup />
      </Form>
    )
    const amountInput = getByLabelText(/amount/i)

    expect(amountInput).toBeDisabled()
  })

  it('renders amount input editable if asset is defined', () => {
    const { getByLabelText } = render(
      <Form defaultValues={{ asset: asset._id }}>
        <Setup />
      </Form>
    )
    const amountInput = getByLabelText(/amount/i)

    expect(amountInput).not.toBeDisabled()
  })
})

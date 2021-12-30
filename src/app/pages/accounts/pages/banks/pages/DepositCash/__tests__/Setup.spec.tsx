import React from 'react'
import { render } from 'test-utils'
import { Setup } from 'app/pages/accounts/pages/banks/pages/DepositCash/Setup'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'components/form/Form'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'

jest.mock('components/form/AssetSelect/AssetSelect', () => ({
  AssetSelect: jest.fn(() => null)
}))

describe('Setup', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    const { getByLabelText } = render(
      <Form>
        <Setup />
      </Form>
    )

    const amountInput = getByLabelText(/amount/i)

    expect(AssetSelect).toHaveBeenCalled()
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

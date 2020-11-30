import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankFields } from 'v2/app/pages/accounts/pages/banks/components/BankFields'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('BankForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without erorr', () => {
    render(
      <Form>
        <BankFields />
      </Form>
    )
  })

  it('renders correct fields', () => {
    render(
      <Form>
        <BankFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'bankName',
        label: 'Bank Name'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'accountHolderName',
        label: 'Account Holder Name'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'asset',
        label: 'Currency',
        assetType: 'Currency'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        name: 'bankAccountNumber',
        label: 'Bank Account Number'
      }),
      {}
    )
    expect(TypedField).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        name: 'swiftCode',
        label: 'Swift Code'
      }),
      {}
    )
  })
})

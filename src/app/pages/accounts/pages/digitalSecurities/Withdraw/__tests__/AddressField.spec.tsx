import React from 'react'
import { render, cleanup } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { AddressField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))
describe('AddressField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form defaultValues={{ addressType: 'new' }}>
        <AddressField />
      </Form>
    )
  })

  it('renders correct form when addressType is new', () => {
    render(
      <Form defaultValues={{ addressType: 'new' }}>
        <AddressField />
      </Form>
    )
    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'newAddress',
        label: 'Enter Withdrawal Address'
      }),
      {}
    )
  })

  it('renders correct form when addressType is existing', () => {
    render(
      <Form defaultValues={{ addressType: 'existing' }}>
        <AddressField />
      </Form>
    )
    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'existingAddress',
        label: 'Select Address'
      }),
      {}
    )
  })
})

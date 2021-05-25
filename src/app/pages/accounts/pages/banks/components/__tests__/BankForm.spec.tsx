import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  BankForm,
  BankFormProps
} from 'app/pages/accounts/pages/banks/components/BankForm'
import { Submit } from 'components/form/Submit'
import { BankFields } from 'app/pages/accounts/pages/banks/components/BankFields'
import { BankDocuments } from 'app/pages/accounts/pages/banks/components/BankDocuments'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'

jest.mock('__tests__/form/Submit', () => ({
  Submit: jest.fn(() => <div />)
}))

jest.mock('app/pages/identity/__tests__/AddressFields/AddressFields', () => ({
  AddressFields: jest.fn(() => <div />)
}))

jest.mock('app/pages/accounts/pages/banks/__tests__/BankFields', () => ({
  BankFields: jest.fn(() => <div />)
}))

jest.mock('app/pages/accounts/pages/banks/__tests__/BankDocuments', () => ({
  BankDocuments: jest.fn(() => <div />)
}))

describe('BankForm', () => {
  const props: BankFormProps = {
    submitButtonLabel: 'submit',
    onSubmit: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
  })

  it('renders without erorr', () => {
    render(<BankForm {...props} />)
  })

  it('renders BankFields, AddressFields, BankDocuments and Submit', () => {
    render(<BankForm {...props} />)

    expect(Submit).toHaveBeenCalled()
    expect(AddressFields).toHaveBeenCalled()
    expect(BankDocuments).toHaveBeenCalled()
    expect(BankFields).toHaveBeenCalled()
  })
})

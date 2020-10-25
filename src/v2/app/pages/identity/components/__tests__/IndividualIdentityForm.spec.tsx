/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentityForm,
  IndividualIdentityFormProps
} from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/identity'
import { Section } from 'v2/app/pages/identity/components/Section'
import { AddressFields } from 'v2/app/pages/identity/components/AddressFields'
import { FinancialFields } from 'v2/app/pages/identity/components/FinancialFields'
import { DeclarationFields } from 'v2/app/pages/identity/components/DeclarationFields'
import { declarations } from 'v2/app/pages/identity/const/declarations'
import { IdentityDataroom } from 'v2/app/pages/identity/components/IdentityDataroom'

jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/AddressFields', () => ({
  AddressFields: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/FinancialFields', () => ({
  FinancialFields: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/IdentityDataroom', () => ({
  IdentityDataroom: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/DeclarationFields', () => ({
  DeclarationFields: jest.fn(() => null)
}))

describe('IndividualIdentityForm', () => {
  const props: IndividualIdentityFormProps = {
    data: individual,
    isNew: false,
    submitButtonText: 'Submit',
    cancelButton: <div data-testid='cancelButton' />
  }

  beforeAll(() => {
    window.URL.revokeObjectURL = jest.fn()
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdentityForm {...props} />)
  })

  it('renders Section with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Section).toHaveBeenNthCalledWith(
      1,
      { title: 'Identity', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      2,
      { title: 'Address', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      3,
      { title: 'Financials', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      4,
      { title: 'Documents', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      5,
      { title: 'Declaration & Acknowledgement', children: expect.anything() },
      {}
    )
  })

  it('renders AddressFields', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(AddressFields).toHaveBeenCalled()
  })

  it('renders FinancialFields', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(FinancialFields).toHaveBeenCalled()
  })

  it('renders IdentityDataroom', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(IdentityDataroom).toHaveBeenCalled()
  })

  it('renders DeclarationFields with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(DeclarationFields).toHaveBeenCalledWith(
      {
        declarations: declarations.individual
      },
      {}
    )
  })
})

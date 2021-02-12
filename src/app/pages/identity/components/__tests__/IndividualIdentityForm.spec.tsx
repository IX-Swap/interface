import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentityForm,
  IndividualIdentityFormProps
} from 'app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/identity'
import { Section } from 'app/pages/identity/components/Section'
import { AddressFields } from 'app/pages/identity/components/AddressFields'
import { FinancialFields } from 'app/pages/identity/components/FinancialFields'
import { DeclarationFields } from 'app/pages/identity/components/DeclarationFields'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'
import * as useIndividualInfoDefaultEmailHook from 'hooks/auth/useIndividualInfoDefaultEmail'
import * as useCachedUserHook from 'hooks/auth/useCachedUser'
import { user } from '__fixtures__/user'

jest.mock('app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('app/pages/identity/components/AddressFields', () => ({
  AddressFields: jest.fn(() => null)
}))
jest.mock('app/pages/identity/components/FinancialFields', () => ({
  FinancialFields: jest.fn(() => null)
}))
jest.mock('app/pages/identity/components/IdentityDataroom', () => ({
  IdentityDataroom: jest.fn(() => null)
}))
jest.mock('app/pages/identity/components/DeclarationFields', () => ({
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

  beforeEach(() => {
    jest
      .spyOn(useIndividualInfoDefaultEmailHook, 'useIndividualInfoDefaultEmail')
      .mockImplementation(() => ({
        isDisabled: true,
        email: ''
      }))

    jest.spyOn(useCachedUserHook, 'useCachedUser').mockReturnValue(user)
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
      { title: 'Financials', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      2,
      { title: 'Documents', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      3,
      { title: 'Declaration', children: expect.anything() },
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
        type: 'individual'
      },
      {}
    )
  })
})

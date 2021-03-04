import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentityForm,
  IndividualIdentityFormProps
} from 'app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/identity'
import * as useIndividualInfoDefaultEmailHook from 'hooks/auth/useIndividualInfoDefaultEmail'
import * as useCachedUserHook from 'hooks/auth/useCachedUser'
import { user } from '__fixtures__/user'

jest.mock('app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('app/pages/identity/components/AddressFields/AddressFields', () => ({
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
})

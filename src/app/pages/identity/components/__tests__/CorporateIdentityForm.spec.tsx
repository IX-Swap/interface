import React from 'react'
import { render, cleanup } from 'test-utils'
import * as utils from 'app/pages/identity/utils'
import {
  CorporateIdentityForm,
  CorporateIdentityFormProps
} from 'app/pages/identity/components/CorporateIdentityForm'
import { corporate } from '__fixtures__/identity'

jest.mock('app/pages/identity/components/AddressFields/AddressFields', () => ({
  AddressFields: jest.fn(() => null)
}))

jest.mock('app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))

jest.mock('app/pages/identity/components/DeclarationFields', () => ({
  DeclarationFields: jest.fn(() => null)
}))

jest.mock('app/pages/identity/components/IdentityDataroom', () => ({
  IdentityDataroom: jest.fn(() => null)
}))

jest.mock('app/pages/identity/components/CorporateProfilesFields', () => ({
  CorporateProfilesFields: jest.fn(() => null)
}))

jest.mock('app/pages/identity/components/CompanyInfoFields', () => ({
  CompanyInfoFields: jest.fn(() => null)
}))

describe('CorporateIdentityForm', () => {
  const props: CorporateIdentityFormProps = {
    data: corporate,
    cancelButton: <div data-testid='cancelButton' />,
    onSubmit: jest.fn(),
    submitButtonText: 'Submit'
  }

  beforeEach(() => {
    jest.spyOn(utils, 'getIdentityFormDefaultValue').mockReturnValue({} as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdentityForm {...props} />)
  })
})

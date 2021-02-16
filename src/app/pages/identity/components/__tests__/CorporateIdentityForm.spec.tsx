import React from 'react'
import { render, cleanup } from 'test-utils'
import * as utils from 'app/pages/identity/utils'
import {
  CorporateIdentityForm,
  CorporateIdentityFormProps
} from 'app/pages/identity/components/CorporateIdentityForm'
import { corporate } from '__fixtures__/identity'
import { CorporateProfilesFields } from 'app/pages/identity/components/CorporateProfilesFields'
import { CompanyInfoFields } from 'app/pages/identity/components/CompanyInfoFields'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { Section } from 'app/pages/identity/components/Section'
import { DeclarationFields } from 'app/pages/identity/components/DeclarationFields'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'

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

  it('renders cancelButton & submitButton when isEditing is true', () => {
    const { queryByTestId, getByText } = render(
      <CorporateIdentityForm {...props} />
    )

    expect(queryByTestId('cancelButton')).not.toBeNull()
    expect(getByText(props.submitButtonText as string)).toBeTruthy()
  })

  it('renders CompanyInformation with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(CompanyInfoFields).toHaveBeenCalled()
  })

  it('renders CorporateProfilesFields', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(CorporateProfilesFields).toHaveBeenCalledTimes(3)
    expect(CorporateProfilesFields).toHaveBeenNthCalledWith(
      1,
      {
        title: 'Company Authorized Personnel',
        type: 'representatives'
      },
      {}
    )
    expect(CorporateProfilesFields).toHaveBeenNthCalledWith(
      2,
      {
        title: 'Company Director',
        type: 'directors'
      },
      {}
    )
    expect(CorporateProfilesFields).toHaveBeenNthCalledWith(
      3,
      {
        title: 'Beneficial Owner',
        type: 'beneficialOwners'
      },
      {}
    )
  })

  it('renders Address with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(AddressFields).toHaveBeenCalledWith(
      { rootName: 'companyAddress' },
      {}
    )
  })

  it('renders Section with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(Section).toHaveBeenCalledTimes(4)
    expect(Section).toHaveBeenNthCalledWith(
      1,
      { title: 'Company Information', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      2,
      { children: expect.anything(), title: 'Company Address' },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      3,
      { children: expect.anything(), title: 'Documents' },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      4,
      {
        children: expect.anything(),
        title: 'Declaration'
      },
      {}
    )
  })

  it('renders Declaration with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(DeclarationFields).toHaveBeenCalledWith(
      {
        type: 'corporate'
      },
      {}
    )
  })

  it('renders Dataroom with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(IdentityDataroom).toHaveBeenCalled()
  })
})

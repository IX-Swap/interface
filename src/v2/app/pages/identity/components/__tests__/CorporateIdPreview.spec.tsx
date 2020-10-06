/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import * as corporateIdentityFormHook from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { CorporateIdPreview } from 'v2/app/pages/identity/components/CorporateIdPreview'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { corporate } from '__fixtures__/identity'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { useTypedForm } from '__fixtures__/createTypedForm'
import { Section } from 'v2/app/pages/identity/components/Section'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'

jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/CompanyInfo', () => ({
  CompanyInformation: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/NoIdentity', () => ({
  NoIdentity: jest.fn(() => null)
}))

describe('CorporateIdPreview', () => {
  const Form = jest.fn(({ children }: any) => children)
  beforeEach(() => {
    jest
      .spyOn(corporateIdentityFormHook, 'useCorporateIdentityForm')
      .mockReturnValue({ ...useTypedForm(), Form })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdPreview />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(
        generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<CorporateIdPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders NoIdentity if data.list is empty', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [] }))
    render(<CorporateIdPreview />)

    expect(NoIdentity).toHaveBeenCalledTimes(1)
    expect(NoIdentity).toHaveBeenCalledWith(
      { link: 'createCorporate', text: 'Create Corporate Identity' },
      {}
    )
  })

  it('renders CompanyInformation with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<CorporateIdPreview />)

    expect(CompanyInformation).toHaveBeenCalledTimes(1)
    expect(CompanyInformation).toHaveBeenCalledWith(
      {
        corporate,
        useOwnEmail: false,
        isEditing: false
      },
      {}
    )
  })

  it('renders Section with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<CorporateIdPreview />)

    expect(Section).toHaveBeenCalledTimes(1)
    expect(Section).toHaveBeenCalledWith(
      {
        actions: expect.anything(),
        children: expect.anything(),
        title: corporate.companyLegalName
      },
      {}
    )
  })

  it('renders Form with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))
    render(<CorporateIdPreview />)

    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        validationSchema: corporateIdentityFormValidationSchema,
        onSubmit: console.log,
        defaultValues: getIdentityFormDefaultValue(corporate, 'corporate'),
        children: expect.anything()
      },
      {}
    )
  })
})

import React from 'react'
import { render, cleanup } from 'test-utils'
import * as allCorporateIdentitiesHook from 'app/pages/_identity/hooks/useAllCorporates'
import { CorporatePreview } from 'app/pages/identity/components/CorporatePreview'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { corporate } from '__fixtures__/identity'
import { CompanyInfoView } from 'app/pages/identity/components/CompanyInfoView'
import { NoIdentity } from 'app/pages/identity/components/NoIdentity'
import { Section } from 'app/pages/identity/components/Section'

jest.mock('app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))

jest.mock('app/pages/identity/components/CompanyInfoView', () => ({
  CompanyInfoView: jest.fn(() => null)
}))

jest.mock('app/pages/identity/components/NoIdentity', () => ({
  NoIdentity: jest.fn(() => null)
}))

describe('CorporateIdPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporatePreview />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(
        generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      )

    const { container } = render(<CorporatePreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders NoIdentity if data.list is empty', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [] }))

    render(<CorporatePreview />)

    expect(NoIdentity).toHaveBeenCalledWith(
      { link: 'createCorporate', text: 'Create Corporate Identity' },
      {}
    )
  })

  it('renders CompanyInformation with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))

    render(<CorporatePreview />)

    expect(CompanyInfoView).toHaveBeenCalledWith({ data: corporate }, {})
  })

  it('renders Section with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(generateInfiniteQueryResult({ list: [corporate] }))

    render(<CorporatePreview />)

    expect(Section).toHaveBeenCalledWith(
      {
        actions: expect.anything(),
        children: expect.anything(),
        title: corporate.companyLegalName
      },
      {}
    )
  })
})

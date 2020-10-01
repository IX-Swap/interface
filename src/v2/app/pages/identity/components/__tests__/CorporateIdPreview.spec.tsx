/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { CorporateIdPreview } from 'v2/app/pages/identity/components/CorporateIdPreview'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { IdentityRoute } from '../../router'
import { corporate } from '__fixtures__/identity'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/CompanyInfo', () => ({
  CompanyInformation: jest.fn(() => null)
}))

describe('CorporateIdPreview', () => {
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
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      }))
    const { container } = render(<CorporateIdPreview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders "Create Corporate Identity" button if data.list is empty', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({ list: [] })
      }))
    const { getByRole } = render(<CorporateIdPreview />)

    expect(getByRole('button')).toHaveTextContent('Create Corporate Identity')
    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: IdentityRoute.createCorporate,
        children: 'Create Corporate Identity'
      },
      {}
    )
  })
  it('renders AppRouterLink & CompanyInformation correctly', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({ list: [corporate] })
      }))
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
    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: IdentityRoute.corporate,
        params: { identityId: corporate._id },
        children: 'View'
      },
      {}
    )
  })
})

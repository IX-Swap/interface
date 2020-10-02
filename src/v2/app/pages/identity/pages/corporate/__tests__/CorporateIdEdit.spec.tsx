/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdEdit } from 'v2/app/pages/identity/pages/corporate/CorporateIdEdit'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { history } from 'v2/history'
import { PageTitle } from 'v2/app/components/PageTitle'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))
jest.mock('v2/app/components/PageTitle', () => ({
  PageTitle: jest.fn(() => null)
}))

describe('CorporateIdEdit', () => {
  const identityId = corporate._id
  beforeEach(() => {
    history.push(IdentityRoute.editCorporate, { identityId })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<CorporateIdEdit />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() =>
        generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<CorporateIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() => generateInfiniteQueryResult({ noData: true }))
    const { container } = render(<CorporateIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders CorporateIdentityForm with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() =>
        generateInfiniteQueryResult({ map: { [identityId]: corporate } })
      )
    render(<CorporateIdEdit />)

    expect(CorporateIdentityForm).toHaveBeenCalledTimes(1)
    expect(CorporateIdentityForm).toHaveBeenNthCalledWith(
      1,
      {
        identity: corporate,
        isEditing: true,
        useOwnEmail: false,
        submitButtonText: 'Save',
        onSubmit: expect.any(Function),
        cancelButton: expect.anything()
      },
      {}
    )
  })

  it('renders PageTitle with correct props', () => {
    render(<CorporateIdEdit />)

    expect(PageTitle).toHaveBeenCalledTimes(1)
    expect(PageTitle).toHaveBeenNthCalledWith(
      1,
      { subPage: true, title: corporate.companyLegalName },
      {}
    )
  })
})

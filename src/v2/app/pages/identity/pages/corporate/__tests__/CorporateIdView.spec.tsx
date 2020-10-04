/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { CorporateIdView } from 'v2/app/pages/identity/pages/corporate/CorporateIdView'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { history } from 'v2/history'
import { PageTitle } from 'v2/app/components/PageTitle'

jest.mock('v2/app/pages/identity/components/CorporateIdentityForm', () => ({
  CorporateIdentityForm: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/EditButton', () => ({
  EditButton: jest.fn(() => null)
}))
jest.mock('v2/app/components/PageTitle', () => ({
  PageTitle: jest.fn(() => null)
}))

describe('CorporateIdView', () => {
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
    render(<CorporateIdView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() =>
        generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      )
    const { container } = render(<CorporateIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders EditButton with correct props', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [identityId]: corporate } })
      )
    render(<CorporateIdView />)

    expect(EditButton).toHaveBeenCalledTimes(1)
    expect(EditButton).toHaveBeenNthCalledWith(
      1,
      {
        params: { identityId },
        link: IdentityRoute.editCorporate
      },
      {}
    )
  })

  it('renders PageTitle with correct props', () => {
    render(<CorporateIdView />)

    expect(PageTitle).toHaveBeenCalledTimes(1)
    expect(PageTitle).toHaveBeenNthCalledWith(
      1,
      { subPage: true, title: corporate.companyLegalName },
      {}
    )
  })

  it('renders CorporateIdentityForm with correct props', () => {
    render(<CorporateIdView />)

    expect(CorporateIdentityForm).toHaveBeenCalledTimes(1)
    expect(CorporateIdentityForm).toHaveBeenNthCalledWith(
      1,
      { useOwnEmail: false, isEditing: false, identity: corporate },
      {}
    )
  })
})

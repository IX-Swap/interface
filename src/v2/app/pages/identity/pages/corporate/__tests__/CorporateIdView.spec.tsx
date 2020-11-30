import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { CorporateView } from 'v2/app/pages/identity/components/CorporateView'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { CorporateIdView } from 'v2/app/pages/identity/pages/corporate/CorporateIdView'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { history } from 'v2/history'

jest.mock('v2/app/pages/identity/components/CorporateView', () => ({
  CorporateView: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/EditButton', () => ({
  EditButton: jest.fn(() => null)
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

    expect(EditButton).toHaveBeenCalledWith(
      {
        params: { identityId },
        link: IdentityRoute.editCorporate
      },
      {}
    )
  })

  it('renders CorporateIdentityForm with correct props', () => {
    render(<CorporateIdView />)

    expect(CorporateView).toHaveBeenCalledWith({ data: corporate }, {})
  })
})

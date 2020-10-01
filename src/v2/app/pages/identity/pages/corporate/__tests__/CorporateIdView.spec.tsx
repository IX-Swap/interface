/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { corporate } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { CorporateIdView } from 'v2/app/pages/identity/pages/corporate/CorporateIdView'
import * as allCorporateIdentitiesHook from 'v2/hooks/identity/useAllCorporateIdentities'
import { history } from 'v2/history'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
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
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
      }))
    const { container } = render(<CorporateIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders edit link', () => {
    jest
      .spyOn(allCorporateIdentitiesHook, 'useAllCorporateIdentities')
      .mockImplementation(() => ({
        ...generateInfiniteQueryResult({ map: { [identityId]: corporate } })
      }))
    render(<CorporateIdView />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        params: { identityId },
        children: 'Edit',
        to: IdentityRoute.editCorporate
      },
      {}
    )
  })
})

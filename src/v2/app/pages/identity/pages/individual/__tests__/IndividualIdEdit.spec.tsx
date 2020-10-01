/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdEdit } from 'v2/app/pages/identity/pages/individual/IndividualIdEdit'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('IndividualIdEdit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdEdit />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ queryStatus: QueryStatus.Loading })
      }))
    const { container } = render(<IndividualIdEdit />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders cancel link', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ data: individual })
      }))
    render(<IndividualIdEdit />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Cancel',
        to: IdentityRoute.individual
      },
      {}
    )
  })
})

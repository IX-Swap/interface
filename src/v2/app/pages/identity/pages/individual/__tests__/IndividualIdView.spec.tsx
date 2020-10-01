/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdView } from 'v2/app/pages/identity/pages/individual/IndividualIdView'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('IndividualIdView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ queryStatus: QueryStatus.Loading })
      }))
    const { container } = render(<IndividualIdView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders edit link', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ data: individual })
      }))
    render(<IndividualIdView />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Edit',
        to: IdentityRoute.editIndividual
      },
      {}
    )
  })
})

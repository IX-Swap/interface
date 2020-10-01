/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as individualIdentityHook from 'v2/hooks/identity/useIndividualIdentity'
import { IndividualIdPreview } from 'v2/app/pages/identity/components/IndividualIdPreview'
import { generateQueryResult } from '__fixtures__/useQuery'
import { individual } from '__fixtures__/identity'
import { QueryStatus } from 'react-query'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { IdentityRoute } from '../../router'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'

jest.mock('v2/app/pages/identity/components/UserInfo', () =>
  jest.fn(() => null)
)
jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))
describe('IndividualIdPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdPreview />)
  })
  it('renders nothing if loading', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ queryStatus: QueryStatus.Loading })
      }))
    const { container } = render(<IndividualIdPreview />)

    expect(container).toBeEmptyDOMElement()
  })
  it('renders "Create Individual Identity" if data is undefined', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ data: undefined })
      }))
    const { getByRole } = render(<IndividualIdPreview />)

    expect(getByRole('button')).toHaveTextContent('Create Individual Identity')
    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: IdentityRoute.createIndividual,
        children: 'Create Individual Identity'
      },
      {}
    )
  })
  it('renders UserInfoComponent & viewIndividualIdentity link', () => {
    jest
      .spyOn(individualIdentityHook, 'useIndividualIdentity')
      .mockImplementation(() => ({
        ...generateQueryResult({ data: individual })
      }))
    render(<IndividualIdPreview />)

    expect(UserInfoComponent).toHaveBeenCalledTimes(1)
    expect(UserInfoComponent).toHaveBeenCalledWith(
      {
        isEditing: false,
        useOwnEmail: true
      },
      {}
    )
    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: IdentityRoute.individual,
        children: 'View'
      },
      {}
    )
  })
})

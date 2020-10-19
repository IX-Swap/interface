/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOList } from 'v2/app/pages/issuance/pages/DSOList'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'
import { DSOList as DSOListComponent } from 'v2/app/components/DSO/components/DSOList'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

jest.mock('v2/app/components/DSO/components/DSOList', () => ({
  DSOList: jest.fn(() => null)
}))
jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('DSOList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOList />)
  })

  it('renders AppRouterLink with correct props', () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: false })

    render(<DSOList />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: IssuanceRoute.create,
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders DSOListComponent with correct props', () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: false })
    render(<DSOList />)

    expect(DSOListComponent).toHaveBeenCalled()
    expect(DSOListComponent).toHaveBeenCalledWith(
      { filter: {}, viewURL: IssuanceRoute.view, user: user },
      {}
    )
  })
})

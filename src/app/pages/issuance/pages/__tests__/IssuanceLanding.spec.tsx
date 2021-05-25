import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { generatePath, Route } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { history } from 'config/history'

jest.mock('__tests__/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/__tests__/MoreOptions', () => ({
  MoreOptions: jest.fn(() => null)
}))

jest.mock('app/__tests__/DSO/__tests__/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/__tests__/IssuanceLanding/Activities', () => ({
  Activities: jest.fn(() => null)
}))

describe('IssuanceLanding', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(
      <Route path={IssuanceRoute.insight}>
        <IssuanceLanding />
      </Route>
    )
  })
})

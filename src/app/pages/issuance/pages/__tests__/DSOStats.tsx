import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOStats } from 'app/pages/issuance/pages/DSOStats'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { generatePath, Route } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { history } from 'config/history'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/MoreOptions', () => ({
  MoreOptions: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/IssuanceLanding/Activities', () => ({
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
        <DSOStats />
      </Route>
    )
  })
})

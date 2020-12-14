import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'

jest.mock('app/components/DSO/components/DSOList', () => ({
  DSOList: jest.fn(() => null)
}))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/MoreOptions', () => ({
  MoreOptions: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

describe('IssuanceLanding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    jest.spyOn(useIssuanceRouterHook, 'useIssuanceRouter').mockReturnValue({
      params: { dsoId: dso._id },
      paths: useIssuanceRouterHook.IssuanceRoute
    } as any)

    render(<IssuanceLanding />)
  })
})

import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router'
import { DSOList } from 'app/components/DSO/components/DSOList'

jest.mock('app/components/DSO/components/DSOList', () => ({
  DSOList: jest.fn(() => null)
}))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('IssuanceLanding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IssuanceLanding />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<IssuanceLanding />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: IssuanceRoute.create,
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders DSOList with correct props', () => {
    render(<IssuanceLanding />)

    expect(DSOList).toHaveBeenCalled()
    expect(DSOList).toHaveBeenCalledWith(
      { all: false, viewURL: IssuanceRoute.view },
      {}
    )
  })
})

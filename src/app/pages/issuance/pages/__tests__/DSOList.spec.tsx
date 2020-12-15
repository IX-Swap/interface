import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router'
import { DSOList as DSOListComponent } from 'app/components/DSO/components/DSOList'

jest.mock('app/components/DSO/components/DSOList', () => ({
  DSOList: jest.fn(() => null)
}))

jest.mock('components/AppRouterLink', () => ({
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
    render(<DSOList />)

    expect(DSOListComponent).toHaveBeenCalled()
    expect(DSOListComponent).toHaveBeenCalledWith(
      { all: false, viewURL: IssuanceRoute.view },
      {}
    )
  })
})

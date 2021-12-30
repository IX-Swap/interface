import React from 'react'
import { render } from 'test-utils'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { MyDSOsTable } from '../../components/MyDSOsTable'

jest.mock('app/pages/issuance/components/MyDSOsTable', () => ({
  MyDSOsTable: jest.fn(() => null)
}))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('DSOList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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

  it('renders MyDSOsTable', () => {
    render(<DSOList />)

    expect(MyDSOsTable).toHaveBeenCalled()
  })
})

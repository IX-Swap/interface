import React from 'react'
import { render } from 'test-utils'

import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('ViewButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<ViewButton link='/' />)
  })

  it('renders AppRouterLink with default params & replace', () => {
    render(<ViewButton link='/' />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        params: {},
        replace: false,
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<ViewButton link='/' params={{ id: 'test-param' }} replace />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/',
        params: { id: 'test-param' },
        replace: true,
        children: expect.anything()
      }),
      {}
    )
  })
})

import React from 'react'
import { render, cleanup } from 'test-utils'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('CancelButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CancelButton link='/' />)
  })

  it('renders AppRouterLink with default params & replace', () => {
    render(<CancelButton link='/' />)

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
    render(<CancelButton link='/' params={{ id: 'test-param' }} replace />)

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

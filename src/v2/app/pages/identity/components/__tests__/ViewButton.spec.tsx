/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewButton } from 'v2/app/pages/identity/components/ViewButton'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('ViewButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ViewButton link='/' />)
  })

  it('renders AppRouterLink with default params & replace', () => {
    render(<ViewButton link='/' />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: {},
        replace: false,
        children: 'View'
      },
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<ViewButton link='/' params={{ id: 'test-param' }} replace />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: { id: 'test-param' },
        replace: true,
        children: 'View'
      },
      {}
    )
  })
})

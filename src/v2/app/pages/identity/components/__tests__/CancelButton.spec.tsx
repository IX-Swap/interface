/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
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

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: {},
        replace: false,
        children: 'Cancel'
      },
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<CancelButton link='/' params={{ id: 'test-param' }} replace />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: { id: 'test-param' },
        replace: true,
        children: 'Cancel'
      },
      {}
    )
  })
})

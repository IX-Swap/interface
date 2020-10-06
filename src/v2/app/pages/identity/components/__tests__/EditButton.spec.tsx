/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('EditButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<EditButton link='/' />)
  })

  it('renders AppRouterLink with default params & replace', () => {
    render(<EditButton link='/' />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: {},
        replace: false,
        children: 'Edit'
      },
      {}
    )
  })

  it('renders AppRouterLink with correct props', () => {
    render(<EditButton link='/' params={{ id: 'test-param' }} replace />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/',
        params: { id: 'test-param' },
        replace: true,
        children: 'Edit'
      },
      {}
    )
  })
})

/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewAllNotifications } from 'v2/app/pages/notifications/components/ViewAllNotifications'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))

describe('ViewAllNotifications', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ViewAllNotifications />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<ViewAllNotifications />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: '/app/notifications',
        children: expect.anything()
      },
      {}
    )
  })

  it('renders ViewAll button', () => {
    const { getByRole } = render(<ViewAllNotifications />)

    expect(getByRole('button')).toBeTruthy()
    expect(getByRole('button')).toHaveTextContent('View All')
  })
})

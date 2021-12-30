import React from 'react'
import { render } from 'test-utils'
import { ViewAllNotifications } from 'app/pages/notifications/components/ViewAllNotifications'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children, ...rest }) => (
    <div {...rest}>{children}</div>
  ))
}))

describe('ViewAllNotifications', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<ViewAllNotifications />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<ViewAllNotifications />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/app/notifications',
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders ViewAll button', () => {
    const { getByRole } = render(<ViewAllNotifications />)

    expect(getByRole('button')).toBeTruthy()
    expect(getByRole('button')).toHaveTextContent('View All')
  })
})

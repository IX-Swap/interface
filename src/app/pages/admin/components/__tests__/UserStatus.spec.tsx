import React from 'react'
import { render } from 'test-utils'
import { UserStatus } from 'app/pages/admin/components/UserStatus'
import { managedUser } from '__fixtures__/user'
import { Status } from 'app/pages/admin/components/Status'

jest.mock('app/pages/admin/components/Status', () => ({
  Status: jest.fn(() => null)
}))

describe('UserStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UserStatus data={managedUser} />)
  })

  it('renders components with correct props', () => {
    render(<UserStatus data={managedUser} />)

    expect(Status).toHaveBeenNthCalledWith(1, { status: 'Enabled' }, {})
    expect(Status).toHaveBeenNthCalledWith(2, { status: '2FA Enabled' }, {})
    expect(Status).toHaveBeenNthCalledWith(
      3,
      { status: 'Verified', variant: 'success' },
      {}
    )
  })

  it('does not render components with false values', () => {
    const { rerender } = render(
      <UserStatus data={{ ...managedUser, enabled: false }} />
    )

    expect(Status).toHaveBeenNthCalledWith(1, { status: '2FA Enabled' }, {})
    expect(Status).toHaveBeenNthCalledWith(
      2,
      { status: 'Verified', variant: 'success' },
      {}
    )

    rerender(<UserStatus data={{ ...managedUser, twoFactorAuth: false }} />)

    expect(Status).toHaveBeenNthCalledWith(3, { status: 'Enabled' }, {})
    expect(Status).toHaveBeenNthCalledWith(
      4,
      { status: 'Verified', variant: 'success' },
      {}
    )

    rerender(<UserStatus data={{ ...managedUser, verified: false }} />)

    expect(Status).toHaveBeenNthCalledWith(5, { status: 'Enabled' }, {})
    expect(Status).toHaveBeenNthCalledWith(6, { status: '2FA Enabled' }, {})
  })
})

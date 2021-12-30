import { UserIdentitiesStatus } from 'app/pages/admin/components/UserIdentitiesStatus'
import React from 'react'
import { render } from 'test-utils'
import { managedUser } from '__fixtures__/user'
import { UserIdentitySelect } from 'app/pages/admin/components/UserIdentitySelect'

jest.mock('app/pages/admin/components/UserIdentitySelect', () => ({
  UserIdentitySelect: jest.fn(() => null)
}))

describe('UserIdentitiesStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UserIdentitiesStatus data={managedUser} />)
  })

  it('renders props correctly', () => {
    render(<UserIdentitiesStatus data={managedUser} />)

    expect(UserIdentitySelect).toHaveBeenCalledWith(
      {
        userIdentities: managedUser.identity,
        userId: managedUser._id
      },
      {}
    )
  })
})

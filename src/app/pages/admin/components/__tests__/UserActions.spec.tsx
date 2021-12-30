import React from 'react'
import { render } from 'test-utils'
import { UserActions } from 'app/pages/admin/components/UserActions'
import { managedUser } from '__fixtures__/user'
import { ActionReset2FA } from 'app/pages/admin/components/ActionReset2FA'
import { ActionEnableToggle } from 'app/pages/admin/components/ActionEnableToggle'
import { ActionResetPassword } from 'app/pages/admin/components/ActionResetPassword'

jest.mock('app/pages/admin/components/ActionReset2FA', () => ({
  ActionReset2FA: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/ActionEnableToggle', () => ({
  ActionEnableToggle: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/ActionResetPassword', () => ({
  ActionResetPassword: jest.fn(() => null)
}))

describe('UserActions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UserActions data={managedUser} />)
  })

  it('renders components with correct props', () => {
    render(<UserActions data={managedUser} />)

    expect(ActionReset2FA).toHaveBeenCalled()
    expect(ActionResetPassword).toHaveBeenCalledWith({ data: managedUser }, {})
    expect(ActionEnableToggle).toHaveBeenCalledWith(
      { enabled: managedUser.enabled },
      {}
    )
  })

  it('does not render ActionReset2FA if twoFactorAuth is false', () => {
    managedUser.twoFactorAuth = false
    render(<UserActions data={managedUser} />)

    expect(ActionReset2FA).not.toHaveBeenCalled()
  })
})

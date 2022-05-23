import React from 'react'
import { SuccessPage } from 'app/pages/identity/pages/SuccessPage/SuccessPage'
import { render } from 'test-utils'
import * as useAuth from 'hooks/auth/useAuth'
import { TwoFAAlert } from 'app/pages/identity/pages/SuccessPage/TwoFAAlert'

jest.mock('app/pages/identity/pages/SuccessPage/TwoFAAlert', () => ({
  TwoFAAlert: jest.fn(() => null)
}))
describe('Checking TwoFAAlert component', () => {
  it('checking 2fa Alert props', () => {
    const userData = {
      isAuthenticated: true,
      user: {
        enable2Fa: undefined
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => userData as any)

    render(<TwoFAAlert />)
    expect(TwoFAAlert).toHaveBeenCalled()
  })
})

describe('Snapshot test for Success Page', () => {
  it('should check SuccessPage after render', () => {
    const page = render(<SuccessPage />)
    expect(page).toMatchSnapshot()
  })
})

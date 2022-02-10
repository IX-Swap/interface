import React from 'react'
import { render } from 'test-utils'
import { Landing } from 'app/pages/security/pages/landing/Landing'
import * as authHook from 'hooks/auth/useAuth'
import { fireEvent } from '@testing-library/react'
import { user } from '__fixtures__/user'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'

describe('Landing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('goes to change2fa page when Update 2FA Authenticator button is clicked and totpConfirmed is true', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: true }
    }))
    const { getAllByText } = render(<Landing />)
    const updateButton = getAllByText(/update/i)[0]
    fireEvent.click(updateButton)

    expect(history.location.pathname).toEqual(SecurityRoute.change2fa)
  })

  it('goes to setup2fa page when Update 2FA Authenticator button is clicked and totpConfirmed is false', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))
    const { getAllByText } = render(<Landing />)
    const updateButton = getAllByText(/update/i)[0]
    fireEvent.click(updateButton)

    expect(history.location.pathname).toEqual(SecurityRoute.setup2fa)
  })

  it('goes to changePassword when Update Password button is clicked', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))
    const { getAllByText } = render(<Landing />)
    const updateButton = getAllByText(/update/i)[1]
    fireEvent.click(updateButton)

    expect(history.location.pathname).toEqual(SecurityRoute.changePassword)
  })
})

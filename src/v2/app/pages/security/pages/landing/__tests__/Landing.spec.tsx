/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import { Landing } from 'v2/app/pages/security/pages/landing/Landing'
import * as authHook from 'v2/hooks/auth/useAuth'
import * as routerHook from 'v2/app/pages/security/routes'
import { fireEvent, waitFor } from '@testing-library/react'
import { user } from '__fixtures__/user'
import { generateRouter } from '__fixtures__/useRouter'

describe('Landing', () => {
  const push = jest.fn()
  beforeEach(() => {
    jest.spyOn(routerHook, 'useSecurityRouter').mockImplementation(() => ({
      ...generateRouter({}),
      push
    }))
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Landing />)
  })

  it('renders TwoFaDialog if totpConfirmed is false', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))
    const { queryByRole } = render(<Landing />)

    expect(queryByRole('dialog')).not.toBeNull()
  })

  it('does not render TwoFaDialog if totpConfirmed is false', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: true }
    }))
    const { queryByRole } = render(<Landing />)
    expect(queryByRole('dialog')).toBeNull()
  })

  it("closes TwoFaDialog if clicked on 'skip for now'", async () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))

    const { getByText, queryByRole } = render(<Landing />)
    expect(queryByRole('dialog')).not.toBeNull()

    const skipButton = getByText(/skip for now/i)
    fireEvent.click(skipButton)

    await waitFor(() => {
      expect(queryByRole('dialog')).toBeNull()
    })
  })

  it('opens TwoFaDialog if Setup button is clicked', async () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))
    const { queryByRole, getByText } = render(<Landing />)

    // opened by default
    expect(queryByRole('dialog')).not.toBeNull()
    const skipButton = getByText(/skip for now/i)
    fireEvent.click(skipButton)

    // closed
    await waitFor(() => {
      expect(queryByRole('dialog')).toBeNull()
    })

    const setupButton = getByText(/setup/i)
    fireEvent.click(setupButton)
    // opened after clicked on setup
    await waitFor(() => {
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  it('pushes changePassword when Change button is clicked', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: true }
    }))
    const { getByText } = render(<Landing />)
    const changeButton = getByText(/change/i)
    fireEvent.click(changeButton)

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('changePassword')
  })

  it('pushes setup2fa when Google Authenticator button is clicked', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { ...user, totpConfirmed: false }
    }))
    const { getAllByRole } = render(<Landing />)

    const gAuthButton = getAllByRole('button')[0]
    fireEvent.click(gAuthButton)

    expect(gAuthButton).toHaveTextContent('Google Authenticator')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('setup2fa')
  })
})

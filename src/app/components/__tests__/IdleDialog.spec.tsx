import { fireEvent } from '@testing-library/react'
import { IdleDialog } from 'app/components/IdleDialog'
import React from 'react'
import { render } from 'test-utils'

describe('IdleDialog', () => {
  const mockClose = jest.fn(() => null)
  const mockReset = jest.fn(() => null)
  const mockLogout = jest.fn(() => null)
  const mockResetLogoutTimer = jest.fn(() => null)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <IdleDialog
        open
        closeDialog={mockClose}
        reset={mockReset}
        logout={mockLogout}
        logoutTimer={10}
        resetLogoutTimer={mockResetLogoutTimer}
      />
    )
  })

  it('calls keep logged in button correctly', () => {
    const { getByRole } = render(
      <IdleDialog
        open
        closeDialog={mockClose}
        reset={mockReset}
        logout={mockLogout}
        logoutTimer={10}
        resetLogoutTimer={mockResetLogoutTimer}
      />
    )

    const keepLoggedInButton = getByRole('button', {
      name: 'Yes, keep me logged in'
    }) as HTMLButtonElement
    fireEvent.click(keepLoggedInButton, { bubbles: true, cancellable: true })

    expect(mockReset).toHaveBeenCalled()
    expect(mockClose).toHaveBeenCalled()
    expect(mockResetLogoutTimer).toHaveBeenCalled()
  })

  it('calls logout button correctly', () => {
    const { getByRole } = render(
      <IdleDialog
        open
        closeDialog={mockClose}
        reset={mockReset}
        logout={mockLogout}
        logoutTimer={10}
        resetLogoutTimer={mockResetLogoutTimer}
      />
    )

    const keepLoggedInButton = getByRole('button', {
      name: 'No, log me out'
    }) as HTMLButtonElement
    fireEvent.click(keepLoggedInButton, { bubbles: true, cancellable: true })

    expect(mockLogout).toHaveBeenCalled()
    expect(mockClose).toHaveBeenCalled()
  })
})

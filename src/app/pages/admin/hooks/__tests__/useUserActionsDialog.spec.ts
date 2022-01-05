import { renderHook } from '@testing-library/react-hooks'
import { useUserActionsDialog } from 'app/pages/admin/hooks/useUserActionsDialog'
import { useState as useStateMock } from 'react'
import { renderHookWithServiceProvider } from 'test-utils'

jest.mock('react', () => ({
  ...jest.requireActual<any>('react'),
  useState: jest.fn()
}))

describe('useUserActionsDialog', () => {
  const setOpen2FA = jest.fn()
  const setEnabledToggleOpen = jest.fn()
  const setResetPasswordOpen = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    renderHook(() => useUserActionsDialog())
  })

  it('invokes setOpen2FA when open2FADialog is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setOpen2FA
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.open2FADialog()
    expect(setOpen2FA).toHaveBeenCalledWith(true)
  })

  it('invokes setOpen2FA when close2FADialog is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setOpen2FA
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.close2FADialog()
    expect(setOpen2FA).toHaveBeenCalledWith(false)
  })

  it('invokes setEnabledToggleOpen when openEnabledToggle is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setEnabledToggleOpen
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.openEnabledToggle()
    expect(setEnabledToggleOpen).toHaveBeenCalledWith(true)
  })

  it('invokes setEnabledToggleOpen when closeEnabledToggle is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setEnabledToggleOpen
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.closeEnabledToggle()
    expect(setEnabledToggleOpen).toHaveBeenCalledWith(false)
  })

  it('invokes setEnabledToggleOpen when openResetPassword is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setEnabledToggleOpen
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.openResetPassword(false)
    expect(setEnabledToggleOpen).toHaveBeenCalledWith(true)
  })

  it('does not  invokes setEnabledToggleOpen when openResetPassword is called with true', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setEnabledToggleOpen
    ])
    const showSnackbar = jest.fn()
    const snackbarObj = { showSnackbar }

    const { result } = renderHookWithServiceProvider(
      () => useUserActionsDialog(),
      {
        snackbarService: snackbarObj
      }
    )

    result.current.openResetPassword(true)
    expect(setEnabledToggleOpen).not.toHaveBeenCalled()
  })

  it('invokes setResetPasswordOpen when closeResetPassword is called', () => {
    ;(useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      init,
      setResetPasswordOpen
    ])

    const { result } = renderHook(() => useUserActionsDialog())

    result.current.closeResetPassword()
    expect(setResetPasswordOpen).toHaveBeenCalledWith(false)
  })
})

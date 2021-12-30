import React from 'react'
import { render } from 'test-utils'
import {
  DialogEnabledToggle,
  DialogEnabledToggleProps
} from 'app/pages/admin/components/DialogEnabledToggle'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'
import * as useEnabledToggle from 'app/pages/admin/hooks/useEnabledToggle'

jest.mock('app/pages/admin/components/UserActionsDialog', () => ({
  UserActionsDialog: jest.fn(({ children }) => <>{children}</>)
}))

describe('DialogEnabledToggle', () => {
  const toggleEnabled = jest.fn()

  jest
    .spyOn(useEnabledToggle, 'useEnabledToggle')
    .mockImplementation(() => [toggleEnabled] as any)

  const mockClose = jest.fn()
  const props: DialogEnabledToggleProps = {
    open: true,
    closeDialog: mockClose,
    enabled: true
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DialogEnabledToggle {...props} />)
  })

  it('calls useEnabledToggle hook with correct ars', () => {
    render(<DialogEnabledToggle {...props} />)

    expect(useEnabledToggle.useEnabledToggle).toHaveBeenCalledWith(
      true,
      mockClose
    )
  })

  it('renders components with correct props when enabled is true', () => {
    const { getByText } = render(<DialogEnabledToggle {...props} />)

    expect(UserActionsDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        closeDialog: mockClose,
        action: toggleEnabled,
        actionLabel: 'DISABLE',
        title: 'Are you sure you want to disable this user?'
      }),
      {}
    )

    expect(
      getByText(
        'Disabling a user will result in the user not being able to access this platform anymore.'
      )
    ).toBeTruthy()
  })

  it('renders component with correct props when enabled is false', () => {
    props.enabled = false
    const { getByText } = render(<DialogEnabledToggle {...props} />)

    expect(UserActionsDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        closeDialog: mockClose,
        action: toggleEnabled,
        actionLabel: 'ENABLE',
        title: 'Are you sure you want to enable this user?'
      }),
      {}
    )

    expect(
      getByText('Enabling users will allow them access to this platform again.')
    ).toBeTruthy()
  })
})

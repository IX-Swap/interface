import React from 'react'
import { render } from 'test-utils'
import * as useUserActionsDialog from 'app/pages/admin/hooks/useUserActionsDialog'
import { DialogEnabledToggle } from 'app/pages/admin/components/DialogEnabledToggle'
import { ButtonError } from 'app/components/ButtonError'
import { ActionEnableToggle } from 'app/pages/admin/components/ActionEnableToggle'

jest.mock('app/components/ButtonError', () => ({
  ButtonError: jest.fn(({ children }) => <>{children}</>)
}))

jest.mock('app/pages/admin/components/DialogEnabledToggle', () => ({
  DialogEnabledToggle: jest.fn(() => null)
}))

describe('ActionEnableToggle', () => {
  const enabledToggleOpenMock = true
  const closeEnabledToggleMock = jest.fn()
  const openEnabledToggleMock = jest.fn()

  jest.spyOn(useUserActionsDialog, 'useUserActionsDialog').mockImplementation(
    () =>
      ({
        enabledToggleOpen: enabledToggleOpenMock,
        closeEnabledToggle: closeEnabledToggleMock,
        openEnabledToggle: openEnabledToggleMock
      } as any)
  )

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components with correct props when enabled is true', () => {
    const { getByText } = render(<ActionEnableToggle enabled={true} />)

    expect(getByText('DISABLE THIS USER')).toBeTruthy()
    expect(ButtonError).toHaveBeenCalledWith(
      expect.objectContaining({
        onClick: openEnabledToggleMock,
        variant: 'contained',
        disableElevation: true
      }),
      {}
    )
    expect(DialogEnabledToggle).toHaveBeenCalledWith(
      {
        enabled: true,
        closeDialog: closeEnabledToggleMock,
        open: enabledToggleOpenMock
      },
      {}
    )
  })

  it('renders components with correct props when enabled is false', () => {
    const { getByText } = render(<ActionEnableToggle enabled={false} />)

    expect(getByText('ENABLE THIS USER')).toBeTruthy()
    expect(DialogEnabledToggle).toHaveBeenCalledWith(
      {
        enabled: false,
        closeDialog: closeEnabledToggleMock,
        open: enabledToggleOpenMock
      },
      {}
    )
  })
})

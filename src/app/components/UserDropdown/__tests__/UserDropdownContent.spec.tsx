import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdownContent } from 'app/components/UserDropdown/UserDropdownContent'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { UserDropdownItem } from 'app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'app/pages/identity/router'
import { SecurityRoute } from 'app/pages/security/router'
import {
  AccountCircleOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@material-ui/icons'

jest.mock('app/components/UserDropdown/UserDropdownItem', () => ({
  UserDropdownItem: jest.fn(() => null)
}))

describe('UserDropdownContent', () => {
  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserDropdownContent {...props} />)
  })

  it('renders UserDropdownItem with correct props', () => {
    render(<UserDropdownContent {...props} />)

    expect(UserDropdownItem).toHaveBeenNthCalledWith(
      1,
      {
        icon: AccountCircleOutlined,
        label: 'Identity',
        link: IdentityRoute.list,
        onClose: props.injectedProps.close
      },
      {}
    )
    expect(UserDropdownItem).toHaveBeenNthCalledWith(
      2,
      {
        icon: SettingsOutlined,
        label: 'Settings',
        link: SecurityRoute.landing,
        onClose: props.injectedProps.close
      },
      {}
    )
    expect(UserDropdownItem).toHaveBeenNthCalledWith(
      3,
      {
        icon: PowerSettingsNewOutlined,
        label: 'Sign Out',
        onClick: expect.any(Function),
        onClose: props.injectedProps.close
      },
      {}
    )
  })
})

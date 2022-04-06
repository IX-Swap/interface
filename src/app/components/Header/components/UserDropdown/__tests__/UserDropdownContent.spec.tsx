import React from 'react'
import { render } from 'test-utils'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import {
  AccountCircleOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
} from '@mui/icons-material'
import { UserDropdownContent } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent'
import { UserDropdownItem } from 'app/components/Header/components/UserDropdown/UserDropdownItem/UserDropdownItem'

jest.mock('app/components/UserDropdown/UserDropdownItem', () => ({
  UserDropdownItem: jest.fn(() => null)
}))

describe('UserDropdownContent', () => {
  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    jest.clearAllMocks()
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

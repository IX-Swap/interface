/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { UserDropdownContent } from 'v2/app/components/UserDropdown/UserDropdownContent'
import { DropdownContentProps } from 'v2/app/components/Dropdown/Dropdown'
import { UserDropdownItem } from 'v2/app/components/UserDropdown/UserDropdownItem'
import { IdentityRoute } from 'v2/app/pages/identity/router'
import { SecurityRoute } from 'v2/app/pages/security/router'
import { ReactComponent as IdentityIcon } from 'assets/icons/navigation/identity.svg'
import { ReactComponent as SecurityIcon } from 'assets/icons/navigation/security.svg'
import { ReactComponent as SignoutIcon } from 'assets/icons/navigation/logout.svg'

jest.mock('v2/app/components/UserDropdown/UserDropdownItem', () => ({
  UserDropdownItem: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/identity.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/security.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/logout.svg', () => ({
  ReactComponent: jest.fn(() => null)
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
        icon: IdentityIcon,
        label: 'Identity',
        link: IdentityRoute.list,
        onClose: props.injectedProps.close
      },
      {}
    )
    expect(UserDropdownItem).toHaveBeenNthCalledWith(
      2,
      {
        icon: SecurityIcon,
        label: 'Settings',
        link: SecurityRoute.landing,
        onClose: props.injectedProps.close
      },
      {}
    )
    expect(UserDropdownItem).toHaveBeenNthCalledWith(
      3,
      {
        icon: SignoutIcon,
        label: 'Sign Out',
        onClick: expect.any(Function),
        onClose: props.injectedProps.close
      },
      {}
    )
  })
})

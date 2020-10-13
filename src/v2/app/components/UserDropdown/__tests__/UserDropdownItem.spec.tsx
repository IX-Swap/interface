/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  UserDropdownItem,
  UserDropdownItemProps
} from 'v2/app/components/UserDropdown/UserDropdownItem'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children }) => children)
}))

describe('UserDropdownItem', () => {
  const props: UserDropdownItemProps = {
    icon: jest.fn(() => null),
    link: jest.fn(() => null),
    label: 'Test label',
    onClose: jest.fn(),
    onClick: jest.fn()
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<UserDropdownItem {...props} />)
  })

  it('renders AppRouterLink with correct props if link is string', () => {
    render(<UserDropdownItem {...props} link='test-link' />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
    expect(AppRouterLink).toHaveBeenCalledWith(
      {
        to: 'test-link',
        children: props.label
      },
      {}
    )
  })

  it('renders icon', () => {
    render(<UserDropdownItem {...props} />)

    expect(props.icon).toHaveBeenCalledTimes(1)
  })
})

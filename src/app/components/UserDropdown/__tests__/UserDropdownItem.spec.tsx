import React from 'react'
import { render } from 'test-utils'
import {
  UserDropdownItem,
  UserDropdownItemProps
} from 'app/components/UserDropdown/UserDropdownItem'
import { AppRouterLink } from 'components/AppRouterLink'
import { fireEvent, waitFor } from '@testing-library/react'
import { history } from 'config/history'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(({ children, ...rest }) => (
    <li {...rest}>{children}</li>
  ))
}))

describe('UserDropdownItem', () => {
  const props: UserDropdownItemProps = {
    icon: jest.fn(() => null),
    link: jest.fn(() => null),
    label: 'Test label',
    onClose: jest.fn(),
    onClick: jest.fn()
  }

  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls onClick when clicked', async () => {
    const { getByRole } = render(<UserDropdownItem {...props} />)

    fireEvent.click(getByRole('menuitem'))

    await waitFor(() => {
      expect(props.onClick).toHaveBeenCalledTimes(1)
      expect(props.onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('selects menuitem when pathname matches current location', async () => {
    const { getByRole } = render(<UserDropdownItem {...props} link='/' />)

    expect(getByRole('menuitem')).toHaveClass('Mui-selected')
  })

  it('does not select menuitem when pathname matches current location', async () => {
    const { getByRole } = render(<UserDropdownItem {...props} />)

    expect(getByRole('menuitem')).not.toHaveClass('Mui-selected')
  })

  it('renders AppRouterLink with correct props if link is string', () => {
    render(<UserDropdownItem {...props} link='test-link' />)

    expect(AppRouterLink).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test-link',
        children: expect.anything()
      }),
      {}
    )
  })

  it('renders icon', () => {
    render(<UserDropdownItem {...props} />)

    expect(props.icon).toHaveBeenCalledTimes(1)
  })
})

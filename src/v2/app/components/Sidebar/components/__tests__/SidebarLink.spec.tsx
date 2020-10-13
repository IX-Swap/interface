/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  SidebarLink,
  SidebarLinkProps
} from 'v2/app/components/Sidebar/components/SidebarLink'

describe('SidebarLink', () => {
  const props: SidebarLinkProps = {
    link: '/',
    label: 'Test Label',
    icon: () => <div data-testid='icon' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SidebarLink {...props} />)
  })

  it('renders icon', () => {
    const { getByTestId } = render(<SidebarLink {...props} />)

    expect(getByTestId('icon')).toBeTruthy()
  })
})

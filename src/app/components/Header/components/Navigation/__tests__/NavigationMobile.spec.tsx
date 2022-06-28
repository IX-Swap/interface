import React from 'react'
import { render } from 'test-utils'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import { NavigationMobile } from 'app/components/Header/components/Navigation/NavigationMobile/NavigationMobile'
import { DropdownContentProps } from 'app/components/Header/components/Dropdown/Dropdown'
import * as useAppNavigationLinks from 'app/components/Header/hooks/useAppNavigation'
import { NavigationDropdownLinkMobile } from 'app/components/Header/components/Navigation/NavigationDropdownLinkMobile'

jest.mock(
  'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer',
  () => ({
    TopbarLinkContainer: jest.fn(() => null)
  })
)

jest.mock(
  'app/components/Header/components/Navigation/NavigationDropdownLinkMobile',
  () => ({
    NavigationDropdownLinkMobile: jest.fn(() => null)
  })
)

describe('NavigationMobile', () => {
  const links = [{ label: '1' }, { label: '2' }]

  const props: DropdownContentProps = {
    injectedProps: { close: jest.fn() },
    popperProps: {}
  } as any

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TopbarLinkContainer components', () => {
    jest.spyOn(useAppNavigationLinks, 'useAppNavigation').mockReturnValue({
      links: links,
      isDropdownLink: jest.fn(() => false)
    } as any)
    render(<NavigationMobile {...props} />)

    expect(TopbarLinkContainer).toHaveBeenCalledTimes(2)
  })

  it('renders NavigationDropdownLinkMobile components', () => {
    jest.spyOn(useAppNavigationLinks, 'useAppNavigation').mockReturnValueOnce({
      links: links,
      isDropdownLink: jest.fn(() => true),
      dropdownLinksItems: jest.fn(() => [
        { label: '11' },
        { label: '12' },
        { label: '13' }
      ])
    } as any)
    render(<NavigationMobile {...props} />)

    expect(NavigationDropdownLinkMobile).toHaveBeenCalledTimes(2)
  })
})

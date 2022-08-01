import React from 'react'
import { render } from 'test-utils'
import { ExternalNavigationLink } from 'app/components/Header/components/Navigation/TopbarLinkContainer/ExternalNavigationLink'

import {
  NavigationLinkDropdownMobileProps,
  NavigationDropdownLinkMobile
} from 'app/components/Header/components/Navigation/NavigationDropdownLinkMobile'

jest.mock(
  'app/components/Header/components/Navigation/TopbarLinkContainer/ExternalNavigationLink',
  () => ({
    ExternalNavigationLink: jest.fn(() => null)
  })
)

const props: NavigationLinkDropdownMobileProps = {
  link: '/test',
  label: 'label',
  dropdownLinksItems: []
}
const externalProps = {
  ...props,
  dropdownLinksItems: [
    { label: 't', path: '/test', external: true, onClick: jest.fn() }
  ]
}

describe('NavigationDropdownLinkMobile', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<NavigationDropdownLinkMobile {...props} />)

    expect(container).toMatchSnapshot()
  })
  it('should render ExternalNavigationLink', () => {
    render(<NavigationDropdownLinkMobile {...externalProps} />)
    expect(ExternalNavigationLink).toHaveBeenCalledWith(
      expect.objectContaining({
        link: externalProps.dropdownLinksItems[0].path,
        label: externalProps.dropdownLinksItems[0].label
      }),

      {}
    )
  })
})

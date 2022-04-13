import React from 'react'
import { render } from 'test-utils'
import {
  NavigationLinkDropdownMobileProps,
  NavigationDropdownLinkMobile
} from 'app/components/Header/components/Navigation/NavigationDropdownLinkMobile'

const props: NavigationLinkDropdownMobileProps = {
  link: '/test',
  label: 'label',
  dropdownLinksItems: []
}

describe('NavigationDropdownLinkMobile', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<NavigationDropdownLinkMobile {...props} />)

    expect(container).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from 'test-utils'
import { TopbarLinkDropdown } from 'app/components/Header/components/Navigation/TopbarLinkDropdown/TopbarLinkDropdown'
import { ExternalNavigationLink } from 'app/components/Header/components/Navigation/TopbarLinkContainer/ExternalNavigationLink'

const props = {
  link: '/test',
  label: 'label',
  linkItems: []
}
jest.mock(
  'app/components/Header/components/Navigation/TopbarLinkContainer/ExternalNavigationLink',
  () => ({
    ExternalNavigationLink: jest.fn(() => null)
  })
)
const externalProps = {
  ...props,
  linkItems: [{ label: 't', path: '/test', external: true }]
}

describe('TopbarLinkDropdown', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<TopbarLinkDropdown {...props} />)

    expect(container).toMatchSnapshot()
  })

  it('should render external link', () => {
    render(<TopbarLinkDropdown {...externalProps} />)

    expect(ExternalNavigationLink).toHaveBeenCalledWith(
      expect.objectContaining({
        link: externalProps.linkItems[0].path,
        label: externalProps.linkItems[0].label
      }),
      {}
    )
  })
})

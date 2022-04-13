import React from 'react'
import { render } from 'test-utils'
import { TopbarLinkDropdown } from 'app/components/Header/components/Navigation/TopbarLinkDropdown/TopbarLinkDropdown'

const props = {
  link: '/test',
  label: 'label',
  linkItems: []
}

describe('TopbarLinkDropdown', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<TopbarLinkDropdown {...props} />)

    expect(container).toMatchSnapshot()
  })
})

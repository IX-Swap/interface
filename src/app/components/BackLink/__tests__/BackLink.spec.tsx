import React from 'react'
import { render } from 'test-utils'
import { BackLink, BackLinkProps } from '../BackLink'

jest.mock('ui/Icons/Icon', () => ({
  Icon: jest.fn(() => null)
}))
jest.mock('@mui/material/Button', () => jest.fn(() => null))

describe('BackLink', () => {
  const props: BackLinkProps = {
    title: 'Test back',
    to: '/app',
    hideTitleOnMobile: true
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if data is null', () => {
    const { container } = render(<BackLink {...props} />)

    expect(container).toMatchSnapshot()
  })
})

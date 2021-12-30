import React from 'react'
import { render } from 'test-utils'
import {
  LandingPageItem,
  LandingPageItemProps
} from 'app/components/LandingPage/LandingPageItem'

describe('LandingPageItem', () => {
  const props: LandingPageItemProps = {
    link: { label: 'Account', path: '/account', icon: jest.fn(() => null) }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders icon correctly', () => {
    render(<LandingPageItem {...props} />)

    expect(props.link.icon).toHaveBeenCalledTimes(1)
  })

  it('renders label correctly', () => {
    const { container } = render(<LandingPageItem {...props} />)

    expect(container).toHaveTextContent(props.link.label)
  })
})
